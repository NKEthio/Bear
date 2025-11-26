import { motion } from 'framer-motion';
import './SoundButton.css';

const SoundButton = ({ sound, text }) => {
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
};

export default SoundButton;
