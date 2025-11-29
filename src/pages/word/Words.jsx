import { useState } from 'react';
import { Link } from 'react-router-dom';
import WordCard from '../../components/WordCard';
import './Words.css';

const Words = () => {
  const levels = [
    { name: 'animals', words: ["Ant", "Cat", "Cow", "Dog", "Egg", "Goat", "Hen", "Ox", "Pig"] },
    { name: 'food', words: ["Bread", "Butter", "Cheese", "Pizza", "Sandwich"] },
    { name: 'cloths', words: ["Belt", "Cap", "Dress", "Hat", "Jacket", "Skirt", "Shorts", "Socks", "Sweater", "Shirt", "Tie", "Trousers", "Zip"] },
    { name: 'home', words: ["Bed", "Bench", "Box", "Cup", "Fork", "Lamp", "Plate", "Pot", "Roof", "Stair", "Umbrella", "Wall", "Window"] },
    { name: 'time', words: ["Clock", "Calendar", "Watch", "Hourglass"] },
    { name: 'action', words: ["Run", "Jump", "Laugh", "Talk", "Play"] },
    { name: 'colors', words: ["Red", "Blue", "Green", "Orange", "White", "Yellow"] },
    { name: 'shapes', words: ["Circle", "Square", "Triangle", "Rectangle", "Star"] }
  ];

  const [currentLevel, setCurrentLevel] = useState(0);

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const handlePreviousLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
    }
  };

  const currentCategory = levels[currentLevel];

  return (
    <main className="words-container" role="main">
      <h1>Learn Words: {currentCategory.name.charAt(0).toUpperCase() + currentCategory.name.slice(1)}</h1>
      <div className="word-grid">
        {currentCategory.words.map((word) => (
          <WordCard key={word} word={word} category={currentCategory.name} />
        ))}
      </div>
      <div className="navigation-buttons">
        <Link to="/alphabetWords" className="abc-button">ABC</Link>
        <button onClick={handlePreviousLevel} disabled={currentLevel === 0}>
          Previous
        </button>
        <button onClick={handleNextLevel} disabled={currentLevel === levels.length - 1}>
          Next
        </button>
        {currentLevel === levels.length - 1 && (
          <Link to="/games/words" className="play-game-button">
            Play a Game
          </Link>
        )}
      </div>
    </main>
  );
};

export default Words;