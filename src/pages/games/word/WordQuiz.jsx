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
    const [gameStarted] = useState(true); // Open directly visible
    const [isPaused, setIsPaused] = useState(false);

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

    // Initial question load when component mounts
    useEffect(() => {
        if (!currentWord) {
            askQuestion();
        }
    }, [askQuestion, currentWord]);

    useEffect(() => {
        if (gameStarted && !isPaused && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (gameStarted && !isPaused && timeLeft === 0) {
            setFeedback("Time's up! Try again.");
            playBuzzSound();
            if (navigator.vibrate) navigator.vibrate(200);
            setTimeout(() => askQuestion(), 1500);
        }
    }, [timeLeft, gameStarted, isPaused, askQuestion]);

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

    const playBuzzSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.25);

            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.25);
        } catch (e) {
            console.error("Audio synth error", e);
        }
    };

    const speakWord = (word) => {
        if (!window.speechSynthesis) return;
        const speech = new SpeechSynthesisUtterance(word);
        speech.lang = "en-US";
        speech.rate = 0.8;
        window.speechSynthesis.speak(speech);
    };

    const checkAnswer = (selectedImagePath) => {
        if (isPaused) return;

        if (selectedImagePath === answer) {
            setScore(score + levels[level].points);
            setFeedback("Correct! Well done!");
            setTimeout(() => askQuestion(), 1000);
        } else {
            setFeedback("Incorrect, Try Again");
            playBuzzSound();
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
        }
    };

    return (
        <div className="quiz-game quiz-game-centered">
            <div className="quiz-header">
                <h1>Word Quiz Game</h1>
                <button
                    className="pause-btn"
                    onClick={() => setIsPaused(!isPaused)}
                >
                    {isPaused ? "▶ Resume" : "⏸ Pause"}
                </button>
            </div>

            {isPaused ? (
                <div className="paused-overlay">
                    <h2>Game Paused</h2>
                    <p>Take a breath and press Resume to continue!</p>
                </div>
            ) : (
                <>
                    <div className="quiz-status-bar">
                        <p className="score"><b>Score: {score}</b></p>
                        <p className="timer">Time Left: {timeLeft}s</p>
                    </div>

                    <div className="word-display-area">
                        <p className="currentWord"><strong>{currentWord}</strong></p>
                        <button className="listen-again-btn" onClick={() => speakWord(currentWord)}>
                            🔊 Listen
                        </button>
                    </div>

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

                    {feedback && (
                        <p className={`feedback ${feedback.includes("Correct") ? "success" : "error"}`}>
                            {feedback}
                        </p>
                    )}

                    <div className="level-buttons">
                        <button
                            className={level === "beginner" ? "active-level" : ""}
                            onClick={() => setLevel("beginner")}
                        >
                            Beginner
                        </button>
                        <button
                            className={level === "intermediate" ? "active-level" : ""}
                            onClick={() => setLevel("intermediate")}
                        >
                            Intermediate
                        </button>
                        <button
                            className={level === "advanced" ? "active-level" : ""}
                            onClick={() => setLevel("advanced")}
                        >
                            Advanced
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
