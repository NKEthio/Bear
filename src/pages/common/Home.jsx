import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  return (
    <main className="home-container" role="main">
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome to Bearlearn!</h1>
        <p>Your fun and interactive language learning adventure awaits!</p>
      </motion.div>

      <div className="language-selection">
        <h2>Choose a Language to Start Learning</h2>
        <div className="language-cards">
          <Link to="/engHome" className="language-card">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <h3>English</h3>
              <p>Learn the most popular language in the world.</p>
            </motion.div>
          </Link>
          <Link to="/amHome" className="language-card">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <h3>Amharic</h3>
              <p>Explore the beautiful language of Ethiopia.</p>
            </motion.div>
          </Link>
          <Link to="/ormoHome" className="language-card">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <h3>Oromo</h3>
              <p>Discover the rich language of the Oromo people.</p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;