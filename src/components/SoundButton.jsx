import { useRef, memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './SoundButton.css';

const SoundButton = memo(({ sound, text }) => {
  const audioRef = useRef(null);

  const playSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
    }
    // Sync the source if sound changes
    if (audioRef.current.src !== sound) {
      audioRef.current.src = sound;
    }
    audioRef.current.play().catch(err => {
      console.error("Playback failed", err);
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
