import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';

import Home from './pages/common/Home';
import EngHome from './pages/common/EngHome';
import Lessons from './pages/Lessons';
import Alphabets from './pages/alphabet/Alphabets';
import Words from './pages/word/Words';
import Sentences from './pages/sentence/Sentences';
import About from './pages/common/About';
import Games from './pages/games/Games';
import AlphabetGame from './pages/games/alphabet/AlphabetGame';
import WordGame from './pages/games/word/WordGame';
import SentenceGame from './pages/games/sentence/SentenceGame';
import Speech from './pages/speech/Speech';
import Dashboard from './pages/features/Dashboard';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Grammar from './pages/grammar/Grammar';
import GrammarGame from './pages/games/grammar/GrammarGame';
import AI from './pages/AI/Deepseek';
import Drawing from './pages/drawing/Drawing';
import AlphabetWords from './pages/alphabetWords/AlphabetWords';
import Lesson1 from './pages/sentence/lesson1/Lesson1';
import Feedback from './pages/feedback/Feedback';
import Lesson1Game from './pages/sentence/lesson1/Lesson1Game';
import AmHome from './pages/common/AmHome';
import Hahu from './pages/Amharic/hohiat/Hahu';
import Qalat from './pages/Amharic/qalat/Qalat';
import OromoHome from './pages/common/OromoHome';

import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import LanguageSwitcher from './components/LanguageSwitcher';

import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState("english");
  const { loading } = useAuth();

  const handleLanguageChange = (language) => {
    setLang(language);
    setIsMenuOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <nav>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={isMenuOpen ? 'open' : ''} onClick={() => setIsMenuOpen(false)}>
          <LanguageSwitcher onLanguageChange={handleLanguageChange} />
          <Navigation lang={lang} />
          <li><Link to={'/'} className='normal-link'>Root</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/engHome" element={<EngHome />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/alphabets" element={<PrivateRoute><Alphabets /></PrivateRoute>} />
        <Route path="/words" element={<PrivateRoute><Words /></PrivateRoute>} />
        <Route path="/lesson1" element={<PrivateRoute><Lesson1 /></PrivateRoute>} />
        <Route path="/sentences" element={<PrivateRoute><Sentences /></PrivateRoute>} />
        <Route path="/grammar" element={<PrivateRoute><Grammar /></PrivateRoute>} />
        <Route path="/speech" element={<PrivateRoute><Speech /></PrivateRoute>} />
        <Route path="/drawing" element={<PrivateRoute><Drawing /></PrivateRoute>} />
        <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
        <Route path="/alphabetWords" element={<PrivateRoute><AlphabetWords /></PrivateRoute>} />
        <Route path="/games" element={<PrivateRoute><Games /></PrivateRoute>} />
        <Route path="/games/lesson1" element={<PrivateRoute><Lesson1Game /></PrivateRoute>} />
        <Route path="/games/alphabets" element={<PrivateRoute><AlphabetGame /></PrivateRoute>} />
        <Route path="/games/words" element={<PrivateRoute><WordGame /></PrivateRoute>} />
        <Route path="/games/sentences" element={<PrivateRoute><SentenceGame /></PrivateRoute>} />
        <Route path="/games/grammar" element={<PrivateRoute><GrammarGame /></PrivateRoute>} />
        <Route path="/ai" element={<PrivateRoute><AI /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/amHome" element={<AmHome />} />
        <Route path="/hahu" element={<Hahu />} />
        <Route path={"/qalat"} element={<Qalat />} />
        <Route path="/ormoHome" element={<OromoHome />} />
      </Routes>
    </Router>
  );
}

export default App;