import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const TRANSLATIONS = {
  lessons: {
    english: 'Lessons',
    amharic: 'ትምህርቶች',
    oromo: 'Barnoota',
  },
  games: {
    english: 'Games',
    amharic: 'ጨዋታዎች',
    oromo: 'Taphoota',
  },
  about: {
    english: 'About',
    amharic: 'ስለ',
    oromo: 'Waaʼee',
  },
  dashboard: {
    english: 'Dashboard',
    amharic: 'ዳሽቦርድ',
    oromo: 'Daashboordii',
  },
  logout: {
    english: 'Logout',
    amharic: 'ውጣ',
    oromo: 'Ba\'i',
  },
  login: {
    english: 'Login',
    amharic: 'ግባ',
    oromo: 'Seeni',
  },
  signup: {
    english: 'Signup',
    amharic: 'ይመዝገቡ',
    oromo: 'Galmaa\'i',
  },
};

const Header = ({ lang, onLanguageChange }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header-inner page-shell">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>Bearlearn</Link>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="menu-toggle-icon" aria-hidden="true" />
          <span className="menu-toggle-text">Menu</span>
        </button>

        <div id="primary-navigation" className={`header-controls ${isMenuOpen ? 'is-open' : ''}`}>
          <nav className="navigation">
            <Link to="/lessons" onClick={closeMenu}>{TRANSLATIONS.lessons[lang]}</Link>
            <Link to="/games" onClick={closeMenu}>{TRANSLATIONS.games[lang]}</Link>
            <Link to="/about" onClick={closeMenu}>{TRANSLATIONS.about[lang]}</Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={closeMenu}>{TRANSLATIONS.dashboard[lang]}</Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="logout-button"
                >
                  {TRANSLATIONS.logout[lang]}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>{TRANSLATIONS.login[lang]}</Link>
                <Link to="/signup" onClick={closeMenu}>{TRANSLATIONS.signup[lang]}</Link>
              </>
            )}
          </nav>
          <div className="language-switcher-container">
            <LanguageSwitcher onLanguageChange={onLanguageChange} />
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  lang: PropTypes.oneOf(['english', 'amharic', 'oromo']).isRequired,
  onLanguageChange: PropTypes.func.isRequired,
};

export default Header;
