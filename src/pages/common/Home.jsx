import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 200 
          }}
        >
          Welcome to Language Adventure!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Learn English, Amharic, and Oromo with fun games and lessons!
        </motion.p>
      </motion.div>

      <motion.div 
        className="solar-system"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div 
          className="sun"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          Bearlearn
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/engHome" className="planet english">English</Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/amHome" className="planet amharic">አማርኛ</Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/ormoHome" className="planet oromo">Oromo</Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className="character-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
      >
        <img 
          src="https://img.freepik.com/premium-vector/star-character_1007853-1461.jpg?ga=GA1.1.1730144561.1742235398&semt=ais_hybrid" 
          alt="Happy Star" 
          className="character" 
        />
      </motion.div>

      <div className="clouds">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>

      <div className="stars"></div>
    </div>
  );
};

export default Home;