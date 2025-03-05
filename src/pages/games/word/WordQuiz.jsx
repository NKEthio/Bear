import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase"; // Adjust path
import { doc, updateDoc, getDoc } from "firebase/firestore";
import "../../styles/wordQuiz.css";

export default function WordQuiz() {
    const categories = {
        animals: ["Cat", "Dog", "Goat", "Hen"],
        food: ["Bread", "Butter", "Cheese", "Pizza", "Sandwich"],
        cloths: ["Belt", "Cap", "Dress", "Jacket"],
        home: ["Bed", "Box", "Cup", "Plate"],
        colors: ["Red", "Blue", "Green", "Yellow"],
        time: ["Clock", "Calendar", "Watch", "Hourglass"]
    };

    const [currentWord, setCurrentWord] = useState();
    const [choices, setChoices] = useState([]);
    
    const [answer, setAnswer] = useState(null);
    const [feedback, setFeedback] = useState("");

    const getImagePath = (category, word) => `/wordImages/${category}/${word}.JPG`;
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
  

    const askQuestion = () => {
        setFeedback("");
        const categoryKeys = Object.keys(categories);
        const randomCategoryKey = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
        const randomCategory = categories[randomCategoryKey];
        const randomWord = randomCategory[Math.floor(Math.random() * randomCategory.length)];
        setCurrentWord(randomWord);

        // Fixed: Use randomCategoryKey instead of randomCategory
        const correctImagePath = getImagePath(randomCategoryKey, randomWord);
        setAnswer(correctImagePath);

        const incorrectChoices = [];
        while (incorrectChoices.length < 3) {
            const randomCatKey = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
            const randomCat = categories[randomCatKey];
            const randomWrd = randomCat[Math.floor(Math.random() * randomCat.length)];
            const randomImagePath = getImagePath(randomCatKey, randomWrd);

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
        <div className="quiz-game">
            <h1>Quiz Game</h1>
            <p className="score"><b>score: {score}</b></p>
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
            {feedback && <p>{feedback}</p>}
        </div>
    );
}