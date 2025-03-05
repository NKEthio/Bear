import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../firebase"; // Adjust path
import { doc, updateDoc, getDoc } from "firebase/firestore";
import "./Lesson1Game3.css"; // Import the stylesheet

const Lesson1Game3 = () => {
    const lessons = [
        { oldWord: "I", newWord: "Eat", action: "Pizza", sentence: "I Eat Pizza" },
        { oldWord: "Dog", newWord: "Sees", action: "Bone", sentence: "Dog Sees Bone" },
        { oldWord: "Cat", newWord: "Likes", action: "Toy", sentence: "Cat Likes Toy" },
        { oldWord: "Boy", newWord: "Holds", action: "Ball", sentence: "Boy Holds Ball" },
        { oldWord: "Girl", newWord: "Draws", action: "Star", sentence: "Girl Draws Star" },
    ];

    const [currentLesson, setCurrentLesson] = useState(null);
    const [shuffledWords, setShuffledWords] = useState([]);
    const [droppedWords, setDroppedWords] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [user, setUser] = useState(null);

    // Get current user
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Save score to Firestore when game ends
    const saveScore = async () => {
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
    };

    // Run saveScore when the component unmounts (user leaves the page)
    useEffect(() => {
        return () => {
            // Cleanup function runs on unmount
            saveScore();
        };
    }, [user, score]); // Dependencies: run when user or score changes

    const startNewRound = () => {
        const randomLesson = lessons[Math.floor(Math.random() * lessons.length)];
        setCurrentLesson(randomLesson);

        const words = [randomLesson.oldWord, randomLesson.newWord, randomLesson.action];
        const shuffled = words.sort(() => Math.random() - 0.5);
        setShuffledWords(shuffled);
        setDroppedWords([]);
        setFeedback("");
    };

    const handleDragStart = (e, word) => {
        e.dataTransfer.setData("text/plain", word);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const word = e.dataTransfer.getData("text/plain");
        setDroppedWords([...droppedWords, word]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const checkSentence = () => {
        const userSentence = droppedWords.join(" ");
        if (userSentence === currentLesson.sentence) {
            setScore(score + 1);
            setFeedback("Correct, bravo!");
            setTimeout(() => startNewRound(), 1000);
        } else {
            setFeedback("Incorrect, Try Again");
        }
    };

    useEffect(() => {
        startNewRound();
    }, []);

    return (
        <div className="lesson2-game3">
            <h2>Sentence Builder Game</h2>
            <p>Drag and drop words to form the correct sentence!</p>
            <p className="score"><b>Score: {score}</b></p>
            <div className="sentence-container" onDrop={handleDrop} onDragOver={handleDragOver}>
                {droppedWords.map((word, index) => (
                    <span key={index} className="dropped-word">
                        {word}{" "}
                    </span>
                ))}
            </div>
            <div className="lesson-words-container">
                {shuffledWords.map((word, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, word)}
                        className="word"
                    >
                        {word}
                    </div>
                ))}
            </div>
            {feedback && <p className="feedback">{feedback}</p>}
            <button className="check-button" onClick={checkSentence}>
                Check Sentence
            </button>
            <button className="next-button" onClick={startNewRound}>
                Next Sentence
            </button>
        </div>
    );
};

export default Lesson1Game3;