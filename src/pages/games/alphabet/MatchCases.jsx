import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { auth, db } from "../../../firebase"; // Adjust path
import { doc, updateDoc, getDoc } from "firebase/firestore";
import '../../styles/MatchCase.css';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const initialPairs = alphabet.split("").map((letter) => ({
  upper: letter,
  lower: letter.toLowerCase(),
  matched: false,
}));

function MatchUpperandLowerCase() {
  const [pairs, setPairs] = useState(initialPairs);
  const [currentSet, setCurrentSet] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const [user, setUser] = useState(null);
  // Get current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  // Save score to Firestore when game ends
  const saveScore = useCallback(async () => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const currentScore = userDoc.exists() ? userDoc.data().score || 0 : 0;
      await updateDoc(userRef, {
        score: currentScore + score, // Add game score to existing score
        lastUpdated: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error saving score:", err);
    }
  }, [user, score]);

  // Run saveScore when the component unmounts (user leaves the page)
  useEffect(() => {
    return () => {
      // Cleanup function runs on unmount
      saveScore();
    };
  }, [saveScore]);


  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const startNewRound = useCallback(() => {
    const availablePairs = pairs.filter((pair) => !pair.matched);
    if (availablePairs.length < 4) {
      alert(`Game Over! Your final score is ${score}`);
      setPairs(initialPairs);
      setScore(0);
      setRound(1);
      return;
    }

    let shuffledPairs = [...availablePairs]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    let shuffledUpperCases = shuffledPairs
      .map(pair => pair.upper)
      .sort(() => Math.random() - 0.5);

    setCurrentSet(
      shuffledPairs.map((pair, index) => ({
        ...pair,
        targetUpper: shuffledUpperCases[index],
      }))
    );
  }, [pairs, score]);

  const moveLetter = useCallback((id, to) => {
    let newPairs;
    let successfulMatch = false;

    // First update the pairs and check for a successful match
    setPairs((prevPairs) => {
      newPairs = prevPairs.map((pair) => {
        if (pair.lower === id && !pair.matched) {
          const targetPair = prevPairs.find((p) => p.upper === to);
          if (targetPair && !targetPair.matched && pair.upper === targetPair.upper) {
            setScore((prevScore) => prevScore + 0.5);
            successfulMatch = true;
            return { ...pair, matched: true };
          } else {
            return pair;
          }
        }
        return pair;
      });
      return newPairs;
    });

    // After state update, check if all 4 are matched
    setTimeout(() => {
      const currentSetMatched = currentSet.every((pair) => 
        newPairs.find((p) => p.upper === pair.upper)?.matched
      );
      
      if (successfulMatch && currentSetMatched) {
        setTimeout(() => {
          startNewRound();
          setRound(prevRound => prevRound + 1);
        }, 500); // Small delay to show the completed match before new round
      }
    }, 0);
  }, [currentSet, startNewRound]);

  const DragLetter = ({ letter, id }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "letter",
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    if (pairs.find((p) => p.lower === id && p.matched)) return null;

    return (
      <div
        ref={drag}
        className="drags"
        style={{
          opacity: isDragging ? 0 : 1
        }}
      >
        {letter}
      </div>
    );
  };

  DragLetter.propTypes = {
    letter: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  const DropZone = ({ letter }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: "letter",
      drop: (item) => moveLetter(item.id, letter),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });

    const matchedPair = pairs.find((pair) => pair.upper === letter && pair.matched);

    return (
      <div
        ref={drop}
        className="drops"
        style={{ backgroundColor: isOver && canDrop ? "#ffafcc" : "white" }}
      >
        {matchedPair ? `${matchedPair.upper}${matchedPair.lower}` : letter}
      </div>
    );
  };

  DropZone.propTypes = {
    letter: PropTypes.string.isRequired,
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="MatchCase">
        <h1>Match Upper and Lower Case</h1>
        <h3>Round: {round}</h3>
        <h3>Score: {score}</h3>
        <div className="drag-drop">
          <div className="drag" >
            {currentSet.map((pair) => (
              !pair.matched ? <DragLetter key={pair.lower} letter={pair.lower} id={pair.lower} /> : null
            ))}
          </div>
          <div className="dropzone">
            {currentSet.map((pair) => (
              <DropZone key={pair.targetUpper} letter={pair.targetUpper} />
            ))}
          </div>
        </div>
        <button onClick={() => {startNewRound(); setRound(prevRound => prevRound + 1)} } className='new'>NEW</button>
      </div>
    </DndProvider>
  );
}

export default MatchUpperandLowerCase;