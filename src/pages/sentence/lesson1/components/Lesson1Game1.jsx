import { useState, useEffect, useCallback } from "react";
import { auth, db } from "../../../../firebase"; // Adjust path
import { doc, updateDoc, getDoc } from "firebase/firestore";
import "./Lesson1Game1.css"; // Import the stylesheet

const wordsAndImages = [
    { word: "I", image: "I.JPG" },
    { word: "Eat", image: "Eat.JPG" },
    { word: "Pizza", image: "Pizza.JPG" },
    { word: "Dog", image: "Dog.JPG" },
    { word: "Sees", image: "Sees.JPG" },
    { word: "Bone", image: "Bone.JPG" },
    { word: "Cat", image: "Cat.JPG" },
    { word: "Likes", image: "Likes.JPG" },
    { word: "Toy", image: "Toy.JPG" },
    { word: "Boy", image: "Boy.JPG" },
    { word: "Holds", image: "Holds.JPG" },
    { word: "Ball", image: "Ball.JPG" },
    { word: "Girl", image: "Girl.JPG" },
    { word: "Draws", image: "Draws.JPG" },
    { word: "Star", image: "Star.JPG" },
];

const Lesson1Game1 = () => {
    const [currentWord, setCurrentWord] = useState("");
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
        setFeedback("");
        const randomWordObj = wordsAndImages[Math.floor(Math.random() * wordsAndImages.length)];
        const randomWord = randomWordObj.word;
        setCurrentWord(randomWord);

        const correctImagePath = `/lesson1/${randomWord}.JPG`;
        setAnswer(correctImagePath);

        const incorrectChoices = [];
        while (incorrectChoices.length < 3) {
            const randomWordObj = wordsAndImages[Math.floor(Math.random() * wordsAndImages.length)];
            const randomImagePath = `/lesson1/${randomWordObj.word}.JPG`;

            if (randomImagePath !== correctImagePath && !incorrectChoices.includes(randomImagePath)) {
                incorrectChoices.push(randomImagePath);
            }
        }

        const allChoices = [correctImagePath, ...incorrectChoices];
        allChoices.sort(() => Math.random() - 0.5);
        setChoices(allChoices);
    }, []);

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
    }, [askQuestion]);

    return (
        <div className="lesson1-game1">
            <h2>Word Match Game</h2>
            <p>Match the word with its correct image!</p>
            <p className="score"><b>Score: {score}</b></p>
            <p className="current-word"><strong>{currentWord}</strong></p>
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

export default Lesson1Game1;