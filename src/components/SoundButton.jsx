import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './SoundButton.css';

// SoundButton is memoized to prevent redundant renders when parent state changes.
const SoundButton = React.memo(({ sound, text }) => {
  // Use a useRef to store a single Audio instance lazily, preventing garbage collection pressure.
  const audioRef = useRef(null);

  // Synchronize the audio source if the sound prop changes, without allocating a new Audio instance.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = sound;
    }
  }, [sound]);

  const playSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
    }
    // Reset playback position to allow rapid repeated triggers of the sound
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
      console.warn('Audio playback failed:', err);
    });
  };

  return (
    <motion.button
      className="sound-button"
      onClick={playSound}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {text}
    </motion.button>
  );
});

// Set displayName for debugging and satisfying ESLint memoization naming rules
SoundButton.displayName = 'SoundButton';

// Proper prop-types validation to eliminate ESLint errors
SoundButton.propTypes = {
  sound: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SoundButton;
