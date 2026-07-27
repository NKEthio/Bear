import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './SoundButton.css';

const SoundButton = React.memo(({ sound, text }) => {
  const audioRef = useRef(null);

  // Synchronize audio source if the sound prop changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = sound;
    }
  }, [sound]);

  const playSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
    }
    // Reset playback position if clicked repeatedly
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
      console.error('Audio playback failed:', err);
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

SoundButton.displayName = 'SoundButton';

SoundButton.propTypes = {
  sound: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SoundButton;
