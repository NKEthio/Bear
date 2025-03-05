import React, { useState, useEffect } from "react";
import "../../styles/FlipFlopGame.css";
import backOfCardImage from '../../../assets/Images/BackOfCard.png';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generatePairs = () => {
  let pairs = [];
  for (let i = 0; i < 6; i++) {
    const letter = letters[i];
    pairs.push({ id: `${letter}-U`, value: letter, type: "uppercase" });
    pairs.push({ id: `${letter}-L`, value: letter.toLowerCase(), type: "lowercase" });
  }
  return pairs.sort(() => Math.random() - 0.5);
};

const FlipFlopGame = () => {
  const [cards, setCards] = useState(generatePairs());
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (first.value.toLowerCase() === second.value.toLowerCase()) {
        setMatchedPairs((prev) => [...prev, first.id, second.id]);
      }
      setTimeout(() => setSelectedCards([]), 1000);
    }
  }, [selectedCards]);

  const handleCardClick = (card) => {
    if (selectedCards.length < 2 && !matchedPairs.includes(card.id) && !selectedCards.includes(card)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  return (
    <div className="game-container">
      <h1>Flip-Flop</h1>
      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${selectedCards.includes(card) || matchedPairs.includes(card.id) ? "flipped" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-inner">
              <div className="card-front"><img src= {backOfCardImage} alt="<||>" /></div>
              <div className="card-back">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
      {matchedPairs.length === cards.length && <h3>Congratulations! You matched all pairs!</h3>}
      <button onClick={() => {
          setCards(generatePairs());
          setSelectedCards([]);
          setMatchedPairs([]);
        }}
        className="restart"
        >RESTART</button>
    </div>
  );
};

export default FlipFlopGame;
