import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/EngHome.css';

export default function Home() {
  return (
    <main className="language-home page-shell standard-page-shell">
      <motion.section
        className="intro-card traditional-card"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <h1>Learn English with Confidence</h1>
        <p>
          Follow structured lessons, play practice games, and use speaking tools to improve your
          English skills in a friendly, distraction-free interface.
        </p>
        <Link to="/lessons" className="cta-button" style={{ marginTop: '1rem' }}>
          Start lessons
        </Link>
      </motion.section>

      <section className="quick-links traditional-card">
        <h2>Quick links</h2>
        <div className="link-grid">
          <Link to="/alphabets" className="link-tile">
            <h3>Alphabets</h3>
            <p>Learn and practice letters quickly.</p>
          </Link>
          <Link to="/words" className="link-tile">
            <h3>Words</h3>
            <p>Grow your everyday vocabulary.</p>
          </Link>
          <Link to="/sentences" className="link-tile">
            <h3>Sentences</h3>
            <p>Understand practical sentence patterns.</p>
          </Link>
          <Link to="/games" className="link-tile">
            <h3>Games</h3>
            <p>Reinforce learning with interactive challenges.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
