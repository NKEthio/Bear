import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/EngHome.css';

const playKidFriendlySound = (label) => {
  console.log(`[Sound Placeholder] Playing audio cue for: ${label}`);
};

export default function Home() {
  return (
    <main className="language-home page-shell kid-lang-home">
      <motion.section
        className="intro-card traditional-card kid-lang-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="kid-lang-title">English for Kids! 🐻</h1>
      </motion.section>

      <section className="quick-links traditional-card kid-links-container">
        <div className="link-grid kid-grid">
          <Link
            to="/alphabets"
            className="link-tile kid-tile alphabets-tile"
            onMouseEnter={() => playKidFriendlySound("Alphabets")}
            onClick={() => playKidFriendlySound("Alphabets")}
          >
            <span className="kid-tile-emoji">🔤</span>
            <h3 className="kid-tile-label">Alphabets</h3>
          </Link>

          <Link
            to="/words"
            className="link-tile kid-tile words-tile"
            onMouseEnter={() => playKidFriendlySound("Words")}
            onClick={() => playKidFriendlySound("Words")}
          >
            <span className="kid-tile-emoji">📝</span>
            <h3 className="kid-tile-label">Words</h3>
          </Link>

          <Link
            to="/sentences"
            className="link-tile kid-tile sentences-tile"
            onMouseEnter={() => playKidFriendlySound("Sentences")}
            onClick={() => playKidFriendlySound("Sentences")}
          >
            <span className="kid-tile-emoji">📖</span>
            <h3 className="kid-tile-label">Sentences</h3>
          </Link>

          <Link
            to="/games"
            className="link-tile kid-tile games-tile"
            onMouseEnter={() => playKidFriendlySound("Games")}
            onClick={() => playKidFriendlySound("Games")}
          >
            <span className="kid-tile-emoji">🎮</span>
            <h3 className="kid-tile-label">Games</h3>
          </Link>
        </div>
      </section>
    </main>
  );
}
