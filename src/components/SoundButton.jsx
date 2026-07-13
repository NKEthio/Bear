import { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './SoundButton.css';
import PropTypes from 'prop-types';

const SoundButton = memo(({ sound, text }) => {
  const audioRef = useRef(null);

  // Synchronize audio source and handle preloading
  useEffect(() => {
    if (sound) {
      if (!audioRef.current) {
        audioRef.current = new Audio(sound);
      } else {
        audioRef.current.src = sound;
      }
      audioRef.current.load(); // Preload for faster playback on click
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [sound]);

  const playSound = () => {
    if (audioRef.current) {
      // Reset to beginning if already playing
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
    }
  };

  return (
    <motion.button
      className="sound-button"
      onClick={playSound}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Play sound for ${text}`}
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
