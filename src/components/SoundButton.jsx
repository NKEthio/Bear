import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import './SoundButton.css';

/**
 * SoundButton Component
 *
 * Performance Optimizations:
 * 1. React.memo: Prevents unnecessary re-renders when the parent component updates,
 *    which is crucial when rendered in large grids (e.g., Alphabets page).
 * 2. Lazy Audio Initialization: Creates the Audio object only on the first click.
 *    This avoids overhead during the initial mount of large grids (e.g., 200+
 *    Amharic characters).
 * 3. Audio Instance Reuse: Maintains the Audio object in a ref to avoid garbage
 *    collection pressure from repeated 'new Audio()' calls.
 */
const SoundButton = React.memo(({ sound, text, title, ariaLabel }) => {
  const audioRef = useRef(null);

  const playSound = () => {
    // Lazy initialization
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
    } else if (!audioRef.current.src.endsWith(sound)) {
      // Update source if it changed (e.g. dynamic props)
      audioRef.current.src = sound;
    }

    // Reset and play
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <motion.button
      className="sound-button"
      onClick={playSound}
      title={title || `Play ${text}`}
      aria-label={ariaLabel || `Play sound for ${text}`}
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
  title: PropTypes.string,
  ariaLabel: PropTypes.string,
};

SoundButton.propTypes = {
  sound: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SoundButton;
