import { useState, useEffect } from "react";
import "../../styles/WordFlipFlopGame.css";
import backOfCardImage from '../../../assets/Images/BackOfCard.png';

const categories = {
    animals: ["Cat", "Dog", "Goat", "Hen"],
    food: ["Bread", "Butter", "Cheese", "Pizza"],
    cloths: ["Belt", "Cap", "Dress", "Jacket"],
    home: ["Bed", "Box", "Cup", "Plate"],
    colors: ["Red", "Blue", "Green", "Yellow"],
    time: ["Clock", "Calendar", "Watch", "Hourglass"]
};

const generatePairs = () => {
    let pairs = [];
    const categoryKeys = Object.keys(categories);
    const selectedCategories = categoryKeys.sort(() => Math.random() - 0.5).slice(0, 2);

    selectedCategories.forEach((categoryKey) => {
        const words = categories[categoryKey].sort(() => Math.random() - 0.5).slice(0, 2);
        words.forEach((word) => {
            const imagePath = `/wordImages/${categoryKey}/${word}.JPG`;
            pairs.push({ id: word, value: word, type: "word", flipped: false });
            pairs.push({ id: `${word}-i`, value: imagePath, type: "image", flipped: false });
        });
    });

    return pairs.sort(() => Math.random() - 0.5);
};

const WordFlipFlopGame = () => {
    const [cards, setCards] = useState(generatePairs());
    const [selectedCards, setSelectedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        if (selectedCards.length === 2) {
            setIsChecking(true);
            const [first, second] = selectedCards;
            const isMatch = first.id.replace(/-i$/, '') === second.id.replace(/-i$/, '');

            setTimeout(() => {
                setCards((prevCards) => prevCards.map((card) =>
                    card.id === first.id || card.id === second.id
                        ? { ...card, flipped: isMatch }
                        : card
                ));
                if (isMatch) setScore((prev) => prev + 2);
                setSelectedCards([]);
                setIsChecking(false);
            }, 1000);
        }
    }, [selectedCards]);

    const handleCardClick = (card) => {
        if (isChecking || card.flipped || selectedCards.length >= 2) return;
        setCards(prevCards => prevCards.map(c => c.id === card.id ? { ...c, flipped: true } : c));
        setSelectedCards([...selectedCards, card]);
    };

    const restartGame = () => {
        setCards(generatePairs().map(card => ({ ...card, flipped: false })));
        setSelectedCards([]);
        setScore(0);
    };

    return (
        <div className="game-container">
            <h1>Flip-Flop</h1>
            <p>Score: {score}</p>
            <div className="grid">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`card ${card.flipped ? "flipped" : ""}`}
                        onClick={() => handleCardClick(card)}
                    >
                        <div className="card-inner">
                            <div className="card-front">
                                <img src={backOfCardImage} alt="Back of Card" />
                            </div>
                            <div className="card-back">
                                {card.type === "word" ? card.value : <img src={card.value} alt={card.value} />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {cards.every((card) => card.flipped) && (
                <div>
                    <h3>Congratulations! You matched all pairs!</h3>
                    <p>Final Score: {score}</p>
                </div>
            )}
            <button onClick={restartGame} className="restart">RESTART</button>
        </div>
    );
};

export default WordFlipFlopGame;
