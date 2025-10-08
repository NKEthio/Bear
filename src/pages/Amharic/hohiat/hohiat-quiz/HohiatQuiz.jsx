import { useState, useEffect, useCallback } from 'react';
import { auth, db } from "../../../firebase"; // Adjust path
import { doc, updateDoc, getDoc } from "firebase/firestore";
import '../../styles/AlphabetQuiz.css';
import soundA from '../../../assets/alphabets/A.wav';
import soundB from '../../../assets/alphabets/B.wav';
import soundC from '../../../assets/alphabets/C.wav';
import soundD from '../../../assets/alphabets/D.wav';
import soundE from '../../../assets/alphabets/E.wav';
import soundF from '../../../assets/alphabets/F.wav';
import soundG from '../../../assets/alphabets/G.wav';
import soundH from '../../../assets/alphabets/H.wav';
import soundI from '../../../assets/alphabets/I.wav';
import soundJ from '../../../assets/alphabets/J.wav';
import soundK from '../../../assets/alphabets/K.wav';
import soundL from '../../../assets/alphabets/L.wav';
import soundM from '../../../assets/alphabets/M.wav';
import soundN from '../../../assets/alphabets/N.wav';
import soundO from '../../../assets/alphabets/O.wav';
import soundP from '../../../assets/alphabets/P.wav';
import soundQ from '../../../assets/alphabets/Q.wav';
import soundR from '../../../assets/alphabets/R.wav';
import soundS from '../../../assets/alphabets/S.wav';
import soundT from '../../../assets/alphabets/T.wav';
import soundU from '../../../assets/alphabets/U.wav';
import soundV from '../../../assets/alphabets/V.wav';
import soundW from '../../../assets/alphabets/W.wav';
import soundX from '../../../assets/alphabets/X.wav';
import soundY from '../../../assets/alphabets/Y.wav';
import soundZ from '../../../assets/alphabets/Z.wav';

import soundOne from '../../../assets/alphabets/One.wav';
import soundTwo from '../../../assets/alphabets/Two.wav';
import soundThree from '../../../assets/alphabets/Three.wav';
import soundFour from '../../../assets/alphabets/Four.wav';
import soundFive from '../../../assets/alphabets/Five.wav';
import soundSix from '../../../assets/alphabets/Six.wav';
import soundSeven from '../../../assets/alphabets/Seven.wav';
import soundEight from '../../../assets/alphabets/Eight.wav';
import soundNine from '../../../assets/alphabets/Nine.wav';

export default function AlphabetQuiz() {
  const [questions] = useState([
    [
      [new Audio(soundA), 'A'], [new Audio(soundB), 'B'], [new Audio(soundC), 'C'], [new Audio(soundD), 'D'],
      [new Audio(soundE), 'E'], [new Audio(soundF), 'F'], [new Audio(soundG), 'G'], [new Audio(soundH), 'H'],
      [new Audio(soundI), 'I'], [new Audio(soundJ), 'J'], [new Audio(soundK), 'K'], [new Audio(soundL), 'L'],
      [new Audio(soundM), 'M'], [new Audio(soundN), 'N'], [new Audio(soundO), 'O'], [new Audio(soundP), 'P'],
      [new Audio(soundQ), 'Q'], [new Audio(soundR), 'R'], [new Audio(soundS), 'S'], [new Audio(soundT), 'T'],
      [new Audio(soundU), 'U'], [new Audio(soundV), 'V'], [new Audio(soundW), 'W'], [new Audio(soundX), 'X'],
      [new Audio(soundY), 'Y'], [new Audio(soundZ), 'Z']
    ],
    [
      [new Audio(soundOne), '1'], [new Audio(soundTwo), '2'], [new Audio(soundThree), '3'],
      [new Audio(soundFour), '4'], [new Audio(soundFive), '5'], [new Audio(soundSix), '6'],
      [new Audio(soundSeven), '7'], [new Audio(soundEight), '8'], [new Audio(soundNine), '9'],
    ]
  ]);

  const [, setCurrentQuestion] = useState(null);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [setNumber, setSetNumber] = useState(false);
  const [setAlphabet, setSetAlphabet] = useState(false);
  const [Start, setStart] = useState(false);
  const [user, setUser] = useState(null);


  const playSound = useCallback((audio) => {
    if (audio && !isPlaying) {
      setIsPlaying(true);
      audio.play();
      console.log("audio Played");
      audio.onended = () => {
        setIsPlaying(false);
      };
    }
  }, [isPlaying]);
  
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
  

  const askQuestion = useCallback(() => {
    let randomQuestionSet;
    if (setAlphabet) {
      randomQuestionSet = questions[0];
    } else if (setNumber) {
      randomQuestionSet = questions[1];
    } else {
      randomQuestionSet = questions[Math.floor(Math.random() * questions.length)];
    }

    const randomIndex = Math.floor(Math.random() * randomQuestionSet.length);
    const question = randomQuestionSet[randomIndex];
    const correctAnswer = question[1];

    const choices = [correctAnswer];
    for (let i = 1; i < 4; i++) {
      const randchoiceIndex = Math.floor(Math.random() * randomQuestionSet.length);
      const randomChoice = randomQuestionSet[randchoiceIndex][1];
      if (!choices.includes(randomChoice)) {
        choices.push(randomChoice);
      } else {
        choices.push(randomQuestionSet[Math.floor(Math.random() * randomQuestionSet.length)][1]);
      }
    }

    // Shuffle choices
    choices.sort(() => Math.random() - 0.5);

    setCurrentQuestion(question);
    setChoices(choices);
    setAnswer(correctAnswer);
    playSound(question[0]);
  }, [questions, setAlphabet, setNumber, playSound, setCurrentQuestion, setChoices, setAnswer]);

  const checkAnswer = (choice) => {
    if (choice === answer) {
      setScore(score + 1);
      askQuestion();
    } else {
      console.log('Wrong answer! Try again.');
    }
  };

  useEffect(() => {
    if(Start) {askQuestion()};
  }, [Start, askQuestion]);

  return (
    <div className='whole-quiz'>
      <h1>Quiz</h1>
      <p>Score: {score}</p>
      {!Start && <button onClick={()=> setStart(true)} className='specifics'>Start</button>}
      
      {Start && <div>
        <div className='quiz'>
        {choices.map((choice, index) => (
          <button key={index} className='choice' onClick={() => checkAnswer(choice)}>
            {choice}
          </button>
        ))}
      </div>
      
      <button className='specifics' onClick={() => { setSetNumber(true); setSetAlphabet(false); }}>123</button>
      <button className='specifics' onClick={() => { setSetAlphabet(true); setSetNumber(false); }}>ABC</button>

      <button className='specifics' onClick={() => {setStart(false)}}>Stop</button>     
      </div>
      }
    </div>
  );
}