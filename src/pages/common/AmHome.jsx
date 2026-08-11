import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/EngHome.css';

const playKidFriendlySound = (label) => {
  console.log(`[Sound Placeholder] Playing audio cue for: ${label}`);
};

export default function AmHome() {
  return (
    <main className="language-home page-shell kid-lang-home" lang="am">
      <motion.section
        className="intro-card traditional-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="kid-lang-title am-home-title">አማርኛ ለልጆች! 🐻</h1>
      </motion.section>

      <section className="quick-links traditional-card kid-links-container">
        <div className="link-grid kid-grid">
          <Link
            to="/hahu"
            className="link-tile kid-tile alphabets-tile"
            onMouseEnter={() => playKidFriendlySound("Hahu")}
            onClick={() => playKidFriendlySound("Hahu")}
          >
            <span className="kid-tile-emoji">🔤</span>
            <h3 className="kid-tile-label">ፊደላት</h3>
          </Link>

          <Link
            to="/qalat"
            className="link-tile kid-tile words-tile"
            onMouseEnter={() => playKidFriendlySound("Qalat")}
            onClick={() => playKidFriendlySound("Qalat")}
          >
            <span className="kid-tile-emoji">📝</span>
            <h3 className="kid-tile-label">ቃላት</h3>
          </Link>

          <Link
            to="/speech"
            className="link-tile kid-tile speech-tile"
            onMouseEnter={() => playKidFriendlySound("Speech")}
            onClick={() => playKidFriendlySound("Speech")}
          >
            <span className="kid-tile-emoji">🗣️</span>
            <h3 className="kid-tile-label">ንግግር</h3>
          </Link>

          <Link
            to="/games"
            className="link-tile kid-tile games-tile"
            onMouseEnter={() => playKidFriendlySound("Games")}
            onClick={() => playKidFriendlySound("Games")}
          >
            <span className="kid-tile-emoji">🎮</span>
            <h3 className="kid-tile-label">ጨዋታዎች</h3>
          </Link>
        </div>
      </section>
    </main>
  );
}
