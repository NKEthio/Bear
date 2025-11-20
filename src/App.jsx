import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

function AnimatedRoutes() {
  const location = useLocation();
  
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const pageTransition = {
    type: "tween",
    duration: 0.3,
    ease: "easeInOut"
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Home />
          </motion.div>
        } />
        <Route path="/engHome" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <EngHome />
          </motion.div>
        } />
        <Route path="/lessons" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Lessons />
          </motion.div>
        } />
        <Route path="/alphabets" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><Alphabets /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/words" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><Words /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/lesson1" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><Lesson1 /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/sentences" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><Sentences /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/grammar" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><Grammar /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/speech" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><Speech /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/drawing" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><Drawing /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/feedback" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><Feedback /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/alphabetWords" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><AlphabetWords /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/games" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><Games /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/games/lesson1" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><Lesson1Game /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/games/alphabets" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><AlphabetGame /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/games/words" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><WordGame /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/games/sentences" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><SentenceGame /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/games/grammar" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><GrammarGame /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/ai" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><AI /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/dashboard" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivateRoute><Dashboard /></PrivateRoute>
          </motion.div>
        } />
        <Route path="/login" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Login />
          </motion.div>
        } />
        <Route path="/signup" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Signup />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <About />
          </motion.div>
        } />
        <Route path="/amHome" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <AmHome />
          </motion.div>
        } />
        <Route path="/hahu" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Hahu />
          </motion.div>
        } />
        <Route path={"/qalat"} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Qalat />
          </motion.div>
        } />
        <Route path="/ormoHome" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <OromoHome />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState("english");
  const { loading } = useAuth();

  const handleLanguageChange = (language) => {
    setLang(language);
    setIsMenuOpen(false);
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
      <nav>
        <motion.div 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.div>

        <ul className={isMenuOpen ? 'open' : ''} onClick={() => setIsMenuOpen(false)}>
          <LanguageSwitcher onLanguageChange={handleLanguageChange} />
          <Navigation lang={lang} />
          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to={'/'} className='normal-link'>Root</Link>
          </motion.li>
        </ul>
      </nav>

      <AnimatedRoutes />
    </Router>
  );
}

export default App;