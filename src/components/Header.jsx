import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const Header = ({ lang, onLanguageChange }) => {
  const { user, logout } = useAuth();

  const translations = {
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

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Bearlearn</Link>
      </div>
      <nav className="navigation">
        <Link to="/lessons">{translations.lessons[lang]}</Link>
        <Link to="/games">{translations.games[lang]}</Link>
        <Link to="/about">{translations.about[lang]}</Link>
        {user ? (
          <>
            <Link to="/dashboard">{translations.dashboard[lang]}</Link>
            <button onClick={logout} className="logout-button">{translations.logout[lang]}</button>
          </>
        ) : (
          <>
            <Link to="/login">{translations.login[lang]}</Link>
            <Link to="/signup">{translations.signup[lang]}</Link>
          </>
        )}
      </nav>
      <div className="language-switcher-container">
        <LanguageSwitcher onLanguageChange={onLanguageChange} />
      </div>
    </header>
  );
};

export default Header;
