import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
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

SoundButton.propTypes = {
  sound: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default SoundButton;
