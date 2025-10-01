import { useState, useEffect, useCallback } from "react";
import { auth, db } from "../../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import "../../styles/wordQuiz.css";

const categories = {
    animals: ["Cat", "Dog", "Goat", "Hen", "Elephant"],
    food: ["Bread", "Butter", "Cheese", "Pizza", "Sandwich", "Pasta"],
    cloths: ["Belt", "Cap", "Dress", "Jacket", "Gloves"],
    home: ["Bed", "Box", "Cup", "Plate", "Chair"],
    colors: ["Red", "Blue", "Green", "Yellow", "Purple"],
    time: ["Clock", "Calendar", "Watch", "Hourglass", "Sundial"]
};

const levels = {
    beginner: { choices: 3, points: 1 },
    intermediate: { choices: 4, points: 2 },
    advanced: { choices: 5, points: 3 }
};

export default function WordQuiz() {
    const [level, setLevel] = useState("beginner");
    const [currentWord, setCurrentWord] = useState();
    const [choices, setChoices] = useState([]);
    const [answer, setAnswer] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [user, setUser] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const askQuestion = useCallback(() => {
        setFeedback("");
        setTimeLeft(10);

        const categoryKeys = Object.keys(categories);
        const randomCategoryKey = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
        const randomCategory = categories[randomCategoryKey];
        const randomWord = randomCategory[Math.floor(Math.random() * randomCategory.length)];
        setCurrentWord(randomWord);
        const correctImagePath = `/wordImages/${randomCategoryKey}/${randomWord}.JPG`;
        setAnswer(correctImagePath);

        const incorrectChoices = [];
        while (incorrectChoices.length < levels[level].choices - 1) {
            const randomCatKey = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
            const randomCat = categories[randomCatKey];
            const randomWrd = randomCat[Math.floor(Math.random() * randomCat.length)];
            const randomImagePath = `/wordImages/${randomCatKey}/${randomWrd}.JPG`;

            if (randomImagePath !== correctImagePath && !incorrectChoices.includes(randomImagePath)) {
                incorrectChoices.push(randomImagePath);
            }
        }

        const allChoices = [correctImagePath, ...incorrectChoices];
        allChoices.sort(() => Math.random() - 0.5);
        setChoices(allChoices);

        speakWord(randomWord);
    }, [level]);

    useEffect(() => {
        if (gameStarted && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (gameStarted && timeLeft === 0) {
            setFeedback("Time's up! Try again.");
            setTimeout(() => askQuestion(), 1500);
        }
    }, [timeLeft, gameStarted, askQuestion]);

    const saveScore = useCallback(async () => {
        if (!user) return;
        try {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            const currentScore = userDoc.exists() ? userDoc.data().score || 0 : 0;
            await updateDoc(userRef, {
                score: currentScore + score,
                lastUpdated: new Date().toISOString(),
            });
        } catch (err) {
            console.error("Error saving score:", err);
        }
    }, [user, score]);

    useEffect(() => {
        return () => {
            saveScore();
        };
    }, [saveScore]);

    const speakWord = (word) => {
        const speech = new SpeechSynthesisUtterance(word);
        speech.lang = "en-US";
        speech.rate = 0.8;
        window.speechSynthesis.speak(speech);
    };

    const checkAnswer = (selectedImagePath) => {
        if (selectedImagePath === answer) {
            setScore(score + levels[level].points);
            setFeedback("Correct! Well done!");
            setTimeout(() => askQuestion(), 1000);
        } else {
            setFeedback("Incorrect, Try Again");
        }
    };

    return (
        <div className="quiz-game">
            <h1>Word Quiz Game</h1>
            {!gameStarted ? (
                <button onClick={() => { setGameStarted(true); askQuestion(); }}>Start Game</button>
            ) : (
                <>
                    <p className="score"><b>Score: {score}</b></p>
                    <p className="timer">Time Left: {timeLeft}s</p>
                    <p className="currentWord"><strong>{currentWord}</strong></p>
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
                    <div className="level-buttons">
                        <button onClick={() => setLevel("beginner")}>Beginner</button>
                        <button onClick={() => setLevel("intermediate")}>Intermediate</button>
                        <button onClick={() => setLevel("advanced")}>Advanced</button>
                    </div>
                </>
            )}
        </div>
    );
}
