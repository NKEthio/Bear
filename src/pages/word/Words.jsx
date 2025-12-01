import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WordCard from '../../components/WordCard';
import './Words.css';

const categoryEmojis = {
  animals: '🐾',
  food: '🍕',
  cloths: '👕',
  home: '🏠',
  time: '⏰',
  action: '🏃',
  colors: '🎨',
  shapes: '🔷',
};

const categoryColors = {
  animals: '#ff6b6b',
  food: '#ffd93d',
  cloths: '#6bcb77',
  home: '#4d96ff',
  time: '#9b59b6',
  action: '#e74c3c',
  colors: '#f39c12',
  shapes: '#1abc9c',
};

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
  const currentColor = categoryColors[currentCategory.name];
  const currentEmoji = categoryEmojis[currentCategory.name];

  return (
    <main className="words-container" role="main">
      <motion.div
        className="words-header"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="words-title">
          <span className="title-emoji">{currentEmoji}</span>
          Learn Words: {currentCategory.name.charAt(0).toUpperCase() + currentCategory.name.slice(1)}
          <span className="title-emoji">{currentEmoji}</span>
        </h1>
        
        {/* Progress indicator */}
        <div className="progress-container">
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              style={{ backgroundColor: currentColor }}
              initial={{ width: 0 }}
              animate={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="progress-text">
            Category {currentLevel + 1} of {levels.length}
          </span>
        </div>

        {/* Category selector */}
        <div className="category-dots">
          {levels.map((level, index) => (
            <motion.button
              key={level.name}
              className={`category-dot ${index === currentLevel ? 'active' : ''}`}
              style={{ 
                backgroundColor: index === currentLevel ? categoryColors[level.name] : '#ddd',
              }}
              onClick={() => setCurrentLevel(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={level.name}
            >
              {categoryEmojis[level.name]}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCategory.name}
          className="word-grid"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {currentCategory.words.map((word, index) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <WordCard word={word} category={currentCategory.name} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="navigation-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/alphabetWords" className="abc-button">
          🔤 ABC
        </Link>
        <motion.button 
          onClick={handlePreviousLevel} 
          disabled={currentLevel === 0}
          whileHover={{ scale: currentLevel === 0 ? 1 : 1.05 }}
          whileTap={{ scale: currentLevel === 0 ? 1 : 0.95 }}
        >
          ← Previous
        </motion.button>
        <motion.button 
          onClick={handleNextLevel} 
          disabled={currentLevel === levels.length - 1}
          whileHover={{ scale: currentLevel === levels.length - 1 ? 1 : 1.05 }}
          whileTap={{ scale: currentLevel === levels.length - 1 ? 1 : 0.95 }}
        >
          Next →
        </motion.button>
        <Link to="/games/words" className="play-game-button">
          🎮 Play Games
        </Link>
      </motion.div>
    </main>
  );
};

export default Words;