import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from './hooks/useAuth';

import Home from './features/languages/Home';
import EngHome from './features/languages/EngHome';
import AmHome from './features/languages/AmHome';
import OromoHome from './features/languages/OromoHome';
import About from './features/languages/About';
import Hahu from './features/languages/Amharic/hohiat/Hahu';
import Qalat from './features/languages/Amharic/qalat/Qalat';

import Lessons from './features/dashboard/Lessons';
import Dashboard from './features/dashboard/Dashboard';

import Alphabets from './features/learning/alphabet/Alphabets';
import Words from './features/learning/word/Words';
import Lesson1 from './features/learning/sentence/lesson1/Lesson1';
import Sentences from './features/learning/sentence/Sentences';
import Grammar from './features/learning/grammar/Grammar';
import Speech from './features/learning/speech/Speech';
import AlphabetWords from './features/learning/alphabetWords/AlphabetWords';

import Games from './features/games/Games';
import Lesson1Game from './features/learning/sentence/lesson1/Lesson1Game';
import AlphabetGame from './features/games/alphabet/AlphabetGame';
import WordGame from './features/games/word/WordGame';
import WordScrambleGame from './features/games/word/WordScrambleGame';
import PictureMatchGame from './features/games/word/PictureMatchGame';
import SpellingBeeGame from './features/games/word/SpellingBeeGame';
import SentenceGame from './features/games/sentence/SentenceGame';
import GrammarGame from './features/games/grammar/GrammarGame';

import AI from './features/ai/Deepseek';
import Drawing from './features/drawing/Drawing';
import Feedback from './features/feedback/Feedback';
import Signup from './features/auth/Signup';
import Login from './features/auth/Login';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import AnimatedRoute from './components/AnimatedRoute';

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
        <Route path="/qalat" element={<AnimatedRoute><Qalat /></AnimatedRoute>} />
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
    </Router>
  );
}

export default App;