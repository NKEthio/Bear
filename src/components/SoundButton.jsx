import { useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './SoundButton.css';

const SoundButton = ({ sound, text }) => {
  // Use a ref to maintain a single Audio instance across renders
  // This avoids the overhead of creating a new Audio object on every click
  const audioRef = useRef(null);

  const playSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
    } else if (audioRef.current.src !== sound) {
      // If the sound prop changed (unlikely for this component but good practice),
      // update the source of the existing Audio object
      audioRef.current.src = sound;
    }

    // Reset and play
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(error => {
      console.error('Audio playback failed:', error);
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
};

SoundButton.propTypes = {
  sound: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SoundButton;
