import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/EngHome.css';

const playKidFriendlySound = (label) => {
  console.log(`[Sound Placeholder] Playing audio cue for: ${label}`);
};

export default function OromoHome() {
  return (
    <main className="language-home page-shell kid-lang-home" lang="om">
      <motion.section
        className="intro-card traditional-card kid-lang-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="kid-lang-title">Afaan Oromoo! 🐻</h1>
      </motion.section>

      <section className="quick-links traditional-card kid-links-container">
        <div className="link-grid kid-grid">
          <Link
            to="/alphabets"
            className="link-tile kid-tile alphabets-tile"
            onMouseEnter={() => playKidFriendlySound("Qubee")}
            onClick={() => playKidFriendlySound("Qubee")}
          >
            <span className="kid-tile-emoji">🔤</span>
            <h3 className="kid-tile-label">Qubee</h3>
          </Link>

          <Link
            to="/words"
            className="link-tile kid-tile words-tile"
            onMouseEnter={() => playKidFriendlySound("Jechoota")}
            onClick={() => playKidFriendlySound("Jechoota")}
          >
            <span className="kid-tile-emoji">📝</span>
            <h3 className="kid-tile-label">Jechoota</h3>
          </Link>

          <Link
            to="/sentences"
            className="link-tile kid-tile sentences-tile"
            onMouseEnter={() => playKidFriendlySound("Himoota")}
            onClick={() => playKidFriendlySound("Himoota")}
          >
            <span className="kid-tile-emoji">📖</span>
            <h3 className="kid-tile-label">Himoota</h3>
          </Link>

          <Link
            to="/games"
            className="link-tile kid-tile games-tile"
            onMouseEnter={() => playKidFriendlySound("Taphoota")}
            onClick={() => playKidFriendlySound("Taphoota")}
          >
            <span className="kid-tile-emoji">🎮</span>
            <h3 className="kid-tile-label">Taphoota</h3>
          </Link>
        </div>
      </section>
    </main>
  );
}
