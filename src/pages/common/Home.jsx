import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  return (
    <main className="home-page page-shell" role="main">
      <motion.section
        className="hero-section traditional-card"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Welcome to Bearlearn</h1>
        <p>
          Learn English, Amharic, and Oromo through lessons, games, and speaking practice with
          a clean experience inspired by Ethiopian heritage colors and patterns.
        </p>
      </motion.section>

      <section className="language-selection traditional-card">
        <h2>Choose your learning language</h2>
        <div className="language-cards">
          <Link to="/engHome" className="language-card">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <h3>English</h3>
              <p>Build vocabulary, grammar, and pronunciation step by step.</p>
            </motion.div>
          </Link>
          <Link to="/amHome" className="language-card">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <h3>አማርኛ</h3>
              <p>Learn core Amharic scripts, words, and daily communication.</p>
            </motion.div>
          </Link>
          <Link to="/ormoHome" className="language-card">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <h3>Afaan Oromo</h3>
              <p>Practice Oromo basics in lessons designed for steady progress.</p>
            </motion.div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
