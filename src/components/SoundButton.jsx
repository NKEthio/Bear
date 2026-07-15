import { memo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './SoundButton.css';

/**
 * SoundButton Component
 *
 * Optimized with React.memo to prevent unnecessary re-renders in large grids.
 * Uses a single Audio instance via useRef to reduce memory overhead and
 * garbage collection pressure from repeated 'new Audio()' calls.
 */
const SoundButton = memo(({ sound, text }) => {
  const audioRef = useRef(null);

  // Synchronize audio source when prop changes
  useEffect(() => {
    if (sound) {
      if (!audioRef.current) {
        audioRef.current = new Audio(sound);
      } else {
        audioRef.current.src = sound;
      }
    }
  }, [sound]);

  const playSound = () => {
    if (audioRef.current) {
      // Reset to beginning if already playing
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  return (
    <motion.button
      className="sound-button"
      onClick={playSound}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="button"
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
