import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './SoundButton.css';

/**
 * SoundButton component that plays a sound when clicked.
 * Optimized by:
 * 1. Reusing the Audio instance via useRef to reduce memory pressure.
 * 2. Synchronizing the Audio src via useEffect to prevent stale media.
 * 3. Using React.memo to prevent unnecessary re-renders.
 */
const SoundButton = React.memo(({ sound, text }) => {
  const audioRef = useRef(new Audio(sound));

  // Sync audio src when sound prop changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = sound;
    }
  }, [sound]);

  const playSound = () => {
    if (audioRef.current) {
      // Reset to beginning if already playing
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
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
