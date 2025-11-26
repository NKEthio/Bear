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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedRoute><Home /></AnimatedRoute>} />
        <Route path="/engHome" element={<AnimatedRoute><EngHome /></AnimatedRoute>} />
        <Route path="/lessons" element={<AnimatedRoute><Lessons /></AnimatedRoute>} />
        <Route path="/alphabets" element={<AnimatedRoute><PrivateRoute><Alphabets /></PrivateRoute></AnimatedRoute>} />
        <Route path="/words" element={<AnimatedRoute><PrivateRoute><Words /></PrivateRoute></AnimatedRoute>} />
        <Route path="/lesson1" element={<AnimatedRoute><PrivateRoute><Lesson1 /></PrivateRoute></AnimatedRoute>} />
        <Route path="/sentences" element={<AnimatedRoute><PrivateRoute><Sentences /></PrivateRoute></AnimatedRoute>} />
        <Route path="/grammar" element={<AnimatedRoute><PrivateRoute><Grammar /></PrivateRoute></AnimatedRoute>} />
        <Route path="/speech" element={<AnimatedRoute><PrivateRoute><Speech /></PrivateRoute></AnimatedRoute>} />
        <Route path="/drawing" element={<AnimatedRoute><PrivateRoute><Drawing /></PrivateRoute></AnimatedRoute>} />
        <Route path="/feedback" element={<AnimatedRoute><PrivateRoute><Feedback /></PrivateRoute></AnimatedRoute>} />
        <Route path="/alphabetWords" element={<AnimatedRoute><PrivateRoute><AlphabetWords /></PrivateRoute></AnimatedRoute>} />
        <Route path="/games" element={<AnimatedRoute><PrivateRoute><Games /></PrivateRoute></AnimatedRoute>} />
        <Route path="/games/lesson1" element={<AnimatedRoute><PrivateRoute><Lesson1Game /></PrivateRoute></AnimatedRoute>} />
        <Route path="/games/alphabets" element={<AnimatedRoute><PrivateRoute><AlphabetGame /></PrivateRoute></AnimatedRoute>} />
        <Route path="/games/words" element={<AnimatedRoute><PrivateRoute><WordGame /></PrivateRoute></AnimatedRoute>} />
        <Route path="/games/sentences" element={<AnimatedRoute><PrivateRoute><SentenceGame /></PrivateRoute></AnimatedRoute>} />
        <Route path="/games/grammar" element={<AnimatedRoute><PrivateRoute><GrammarGame /></PrivateRoute></AnimatedRoute>} />
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
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0]
          }}
          transition={{ 
            duration: 2,
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