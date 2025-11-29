import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './WordCard.css';

const WordCard = ({ word, category }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const getImagePath = (category, word) => `/wordImages/${category}/${word}.JPG`;

  const playAudio = (word) => {
    setIsPlaying(true);
    setShowSparkles(true);
    
    // Use Web Speech API for consistent speech
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = 'en-US';
    speech.rate = 0.8;
    speech.onend = () => {
      setIsPlaying(false);
      setTimeout(() => setShowSparkles(false), 500);
    };
    window.speechSynthesis.speak(speech);
  };

  return (
    <motion.div
      className={`word-card ${isPlaying ? 'playing' : ''}`}
      onClick={() => playAudio(word)}
      whileHover={{ 
        scale: 1.08,
        rotate: [0, -2, 2, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="card-image-container">
        <img src={getImagePath(category, word)} alt={word} />
        <motion.div 
          className="play-icon"
          animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
        >
          🔊
        </motion.div>
      </div>
      <p className="word-text">{word}</p>
      <span className="tap-hint">Tap to hear!</span>
      
      {showSparkles && (
        <div className="sparkles">
          <span className="sparkle">✨</span>
          <span className="sparkle">⭐</span>
          <span className="sparkle">💫</span>
        </div>
      )}
    </motion.div>
  );
};

WordCard.propTypes = {
  word: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default WordCard;
