import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const playKidFriendlySound = (label) => {
  console.log(`[Sound Placeholder] Playing audio cue for: ${label}`);
  // Future idea: add speech synthesis or load pre-recorded audio assets
  // e.g.,
  // const utterance = new SpeechSynthesisUtterance(label);
  // window.speechSynthesis.speak(utterance);
};

const Home = () => {
  return (
    <main className="home-page page-shell" role="main">
      <motion.section
        className="hero-section traditional-card kid-hero"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="kid-title">Bearlearn 🐻</h1>
      </motion.section>

      <section className="language-selection traditional-card kid-selection">
        <h2 className="kid-subtitle">Choose Your Language!</h2>
        <div className="language-cards kid-cards">
          <Link
            to="/engHome"
            className="language-card kid-card english-card"
            onMouseEnter={() => playKidFriendlySound("English")}
            onClick={() => playKidFriendlySound("English")}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="kid-card-content">
              <span className="kid-flag">🇬🇧</span>
              <h3 className="kid-lang-name">English</h3>
            </motion.div>
          </Link>
          <Link
            to="/amHome"
            className="language-card kid-card amharic-card"
            onMouseEnter={() => playKidFriendlySound("Amharic")}
            onClick={() => playKidFriendlySound("Amharic")}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="kid-card-content">
              <span className="kid-flag">🇪🇹</span>
              <h3 className="kid-lang-name">አማርኛ</h3>
            </motion.div>
          </Link>
          <Link
            to="/ormoHome"
            className="language-card kid-card oromo-card"
            onMouseEnter={() => playKidFriendlySound("Afaan Oromo")}
            onClick={() => playKidFriendlySound("Afaan Oromo")}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="kid-card-content">
              <span className="kid-flag">🦁</span>
              <h3 className="kid-lang-name">Afaan Oromo</h3>
            </motion.div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
