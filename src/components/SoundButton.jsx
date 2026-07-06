import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './SoundButton.css';

/**
 * SoundButton component for playing audio on click.
 * Wrapped in React.memo to prevent unnecessary re-renders in large grids,
 * reducing the render cycle time for pages like Alphabets and Hahu.
 */
const SoundButton = memo(({ sound, text }) => {
  const playSound = () => {
    const audio = new Audio(sound);
    audio.play();
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
