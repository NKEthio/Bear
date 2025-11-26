import { motion } from 'framer-motion';
import './WordCard.css';

const WordCard = ({ word, category }) => {
  const getImagePath = (category, word) => `/wordImages/${category}/${word}.JPG`;
  const getAudioPath = (word) => `/Audios/${word}.mp3`;

  const playAudio = (word) => {
    const audio = new Audio(getAudioPath(word));
    audio.play().catch((error) => {
      console.error(`Error playing audio for ${word}:`, error);
    });
  };

  return (
    <motion.div
      className="word-card"
      onClick={() => playAudio(word)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={getImagePath(category, word)} alt={word} />
      <p>{word}</p>
    </motion.div>
  );
};

export default WordCard;
