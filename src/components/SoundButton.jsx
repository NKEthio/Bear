import { useRef, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './SoundButton.css';

const SoundButton = memo(({ sound, text }) => {
  const audioRef = useRef(null);

  // Clean up any active audio on unmount to prevent memory leaks or loose audios
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
      }
    };
  }, []);

  const playSound = () => {
    // Lazily instantiate a single Audio element on first click
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
    } else if (audioRef.current.src !== sound) {
      // In case the sound prop changes, update the source
      audioRef.current.src = sound;
    }

    audioRef.current.currentTime = 0; // Rewind to start if clicked rapidly
    audioRef.current.play().catch((err) => console.log('Audio playback failed:', err));
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
