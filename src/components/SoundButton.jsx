import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './SoundButton.css';

/**
 * SoundButton component that plays a sound when clicked.
 * Optimized with React.memo and useRef to reuse Audio instances.
 */
const SoundButton = React.memo(({ sound, text }) => {
  // Use useRef to maintain a single Audio instance for the lifetime of the component
  const audioRef = useRef(null);

  // Synchronize the Audio instance's source with the sound prop
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
    } else {
      audioRef.current.src = sound;
    }
  }, [sound]);

  const playSound = () => {
    if (audioRef.current) {
      // Reset sound to start to allow rapid clicking
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.error("Audio play failed:", err));
    }
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

SoundButton.displayName = 'SoundButton';

SoundButton.propTypes = {
  sound: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SoundButton;
