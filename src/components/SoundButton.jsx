import { memo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './SoundButton.css';

/**
 * SoundButton Component
 *
 * Performance Optimizations:
 * 1. Reuses Audio instance via useRef to prevent repeated instantiation and reduce memory pressure.
 * 2. Wrapped in React.memo to prevent unnecessary re-renders when parent state changes.
 */
const SoundButton = memo(({ sound, text }) => {
  const audioRef = useRef(null);

  // Synchronize Audio source with the sound prop
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = sound;
    }
  }, [sound]);

  const playSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
    }

    // Reset to start if already playing
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(error => {
      console.error("Audio playback failed:", error);
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
