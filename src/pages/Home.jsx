import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the separate stylesheet

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Language Adventure!</h1>
      <p>Learn English, Amharic, and Oromo with fun games and lessons!</p>

      <div className="character-container">
        <img src="https://via.placeholder.com/150?text=Happy+Star" alt="Happy Star" className="character" />
      </div>

      <div className="button-container">
        <Link to="/engHome" className="fun-button lessons-btn">English</Link>
        <Link to="/amHome" className="fun-button games-btn">አማርኛ</Link>
        <Link to="/ormoHome" className="fun-button about-btn">Oromo</Link>
      </div>

      <div className="clouds">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>
    </div>
  );
};

export default Home;