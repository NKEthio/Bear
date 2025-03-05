import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../firebase"; // Adjust path
import { doc, updateDoc, getDoc } from "firebase/firestore";
import "./Lesson1Game2.css"; // Import the stylesheet

export default function Lesson1Game2 () {
    const wordsAndImages = [
        { word: "I", image: "I.JPG", audio: "I.mp3" },
        { word: "Eat", image: "Eat.JPG", audio: "Eat.mp3" },
        { word: "Pizza", image: "Pizza.JPG", audio: "Pizza.mp3" },
        { word: "Dog", image: "Dog.JPG", audio: "Dog.mp3" },
        { word: "Sees", image: "Sees.JPG", audio: "Sees.mp3" },
        { word: "Bone", image: "Bone.JPG", audio: "Bone.mp3" },
        { word: "Cat", image: "Cat.JPG", audio: "Cat.mp3" },
        { word: "Likes", image: "Likes.JPG", audio: "Likes.mp3" },
        { word: "Toy", image: "Toy.JPG", audio: "Toy.mp3" },
        { word: "Boy", image: "Boy.JPG", audio: "Boy.mp3" },
        { word: "Holds", image: "Holds.JPG", audio: "Holds.mp3" },
        { word: "Ball", image: "Ball.JPG", audio: "Ball.mp3" },
        { word: "Girl", image: "Girl.JPG", audio: "Girl.mp3" },
        { word: "Draws", image: "Draws.JPG", audio: "Draws.mp3" },
        { word: "Star", image: "Star.JPG", audio: "Star.mp3" },
    ];

    const [currentAudio, setCurrentAudio] = useState("");
    const [choices, setChoices] = useState([]);
    const [answer, setAnswer] = useState(null);
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

    const getImagePath = (word) => `/lesson1/${word}.JPG`;
    const getAudioPath = (word) => `/Audios/${word}.mp3`;

    const askQuestion = () => {
        setFeedback("");
        const randomWordObj = wordsAndImages[Math.floor(Math.random() * wordsAndImages.length)];
        const randomWord = randomWordObj.word;
        setCurrentAudio(getAudioPath(randomWord));

        const correctImagePath = getImagePath(randomWord);
        setAnswer(correctImagePath);

        const incorrectChoices = [];
        while (incorrectChoices.length < 3) {
            const randomWordObj = wordsAndImages[Math.floor(Math.random() * wordsAndImages.length)];
            const randomImagePath = getImagePath(randomWordObj.word);

            if (randomImagePath !== correctImagePath && !incorrectChoices.includes(randomImagePath)) {
                incorrectChoices.push(randomImagePath);
            }
        }

        const allChoices = [correctImagePath, ...incorrectChoices];
        allChoices.sort(() => Math.random() - 0.5);
        setChoices(allChoices);
    };

    const checkAnswer = (selectedImagePath) => {
        if (selectedImagePath === answer) {
            setScore(score + 1);
            setFeedback("Correct, bravo!");
            setTimeout(() => askQuestion(), 1000);
        } else {
            setFeedback("Incorrect, Try Again");
        }
    };

    useEffect(() => {
        askQuestion();
    }, []);

    return (
        <div className="lesson2-game2">
            <h2>Audio Match Game</h2>
            <p>Listen to the audio and select the correct image!</p>
            <p className="score"><b>Score: {score}</b></p>
            <audio controls src={currentAudio} className="audio-player" />
            <div className="choices">
                {choices.map((imagePath, index) => (
                    <img
                        key={index}
                        src={imagePath}
                        alt={`Choice ${index + 1}`}
                        onClick={() => checkAnswer(imagePath)}
                        className="word-choice"
                    />
                ))}
            </div>
            {feedback && <p className="feedback">{feedback}</p>}
            <button className="next-button" onClick={askQuestion}>
                Next Question
            </button>
        </div>
    );
};