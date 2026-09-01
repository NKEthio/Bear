import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from './hooks/useAuth';

import Home from './pages/common/Home';
import EngHome from './pages/common/EngHome';
import Lessons from './pages/features/Lessons';
import Alphabets from './pages/alphabet/Alphabets';
import Words from './pages/word/Words';
import Sentences from './pages/sentence/Sentences';
import About from './pages/common/About';
import Games from './pages/games/Games';
import AlphabetGame from './pages/games/alphabet/AlphabetGame';
import WordGame from './pages/games/word/WordGame';
import WordScrambleGame from './pages/games/word/WordScrambleGame';
import PictureMatchGame from './pages/games/word/PictureMatchGame';
import SpellingBeeGame from './pages/games/word/SpellingBeeGame';
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
import Header from './components/Header';
import AnimatedRoute from './components/AnimatedRoute';
import AppTutorial from './components/AppTutorial';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedRoute><Home /></AnimatedRoute>} />
        <Route path="/engHome" element={<AnimatedRoute><EngHome /></AnimatedRoute>} />
        <Route path="/lessons" element={<AnimatedRoute><Lessons /></AnimatedRoute>} />
        <Route path="/alphabets" element={<AnimatedRoute><Alphabets /></AnimatedRoute>} />
        <Route path="/words" element={<AnimatedRoute><Words /></AnimatedRoute>} />
        <Route path="/lesson1" element={<AnimatedRoute><Lesson1 /></AnimatedRoute>} />
        <Route path="/sentences" element={<AnimatedRoute><Sentences /></AnimatedRoute>} />
        <Route path="/grammar" element={<AnimatedRoute><Grammar /></AnimatedRoute>} />
        <Route path="/speech" element={<AnimatedRoute><Speech /></AnimatedRoute>} />
        <Route path="/drawing" element={<AnimatedRoute><Drawing /></AnimatedRoute>} />
        <Route path="/feedback" element={<AnimatedRoute><Feedback /></AnimatedRoute>} />
        <Route path="/alphabetWords" element={<AnimatedRoute><AlphabetWords /></AnimatedRoute>} />
        <Route path="/games" element={<AnimatedRoute><Games /></AnimatedRoute>} />
        <Route path="/games/lesson1" element={<AnimatedRoute><Lesson1Game /></AnimatedRoute>} />
        <Route path="/games/alphabets" element={<AnimatedRoute><AlphabetGame /></AnimatedRoute>} />
        <Route path="/games/words" element={<AnimatedRoute><WordGame /></AnimatedRoute>} />
        <Route path="/games/sentences" element={<AnimatedRoute><SentenceGame /></AnimatedRoute>} />
        <Route path="/games/grammar" element={<AnimatedRoute><GrammarGame /></AnimatedRoute>} />
        <Route path="/games/word-scramble" element={<AnimatedRoute><WordScrambleGame /></AnimatedRoute>} />
        <Route path="/games/picture-match" element={<AnimatedRoute><PictureMatchGame /></AnimatedRoute>} />
        <Route path="/games/spelling-bee" element={<AnimatedRoute><SpellingBeeGame /></AnimatedRoute>} />
        <Route path="/ai" element={<AnimatedRoute><PrivateRoute><AI /></PrivateRoute></AnimatedRoute>} />
        <Route path="/dashboard" element={<AnimatedRoute><PrivateRoute><Dashboard /></PrivateRoute></AnimatedRoute>} />
        <Route path="/login" element={<AnimatedRoute><Login /></AnimatedRoute>} />
        <Route path="/signup" element={<AnimatedRoute><Signup /></AnimatedRoute>} />
        <Route path="/about" element={<AnimatedRoute><About /></AnimatedRoute>} />
        <Route path="/amHome" element={<AnimatedRoute><AmHome /></AnimatedRoute>} />
        <Route path="/hahu" element={<AnimatedRoute><Hahu /></AnimatedRoute>} />
        <Route path={"/qalat"} element={<AnimatedRoute><Qalat /></AnimatedRoute>} />
        <Route path="/ormoHome" element={<AnimatedRoute><OromoHome /></AnimatedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [lang, setLang] = useState("english");
  const { loading } = useAuth();

  const handleLanguageChange = (language) => {
    setLang(language);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff'
        }}
      >
        <motion.div
          animate={{ 
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading...
        </motion.div>
      </motion.div>
    );
  }

  return (
    <Router>
      <Header lang={lang} onLanguageChange={handleLanguageChange} />
      <AnimatedRoutes />
      <AppTutorial />
    </Router>
  );
}

export default App;