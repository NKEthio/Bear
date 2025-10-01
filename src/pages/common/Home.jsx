import { Link } from 'react-router-dom';
import '../Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Language Adventure!</h1>
        <p>Learn English, Amharic, and Oromo with fun games and lessons!</p>
      </div>

      <div className="solar-system">
        <div className="sun">Bearlearn</div>
        <Link to="/engHome" className="planet english">English</Link>
        <Link to="/amHome" className="planet amharic">አማርኛ</Link>
        <Link to="/ormoHome" className="planet oromo">Oromo</Link>
      </div>

      <div className="character-container">
        <img src="https://img.freepik.com/premium-vector/star-character_1007853-1461.jpg?ga=GA1.1.1730144561.1742235398&semt=ais_hybrid" alt="Happy Star" className="character" />
      </div>

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