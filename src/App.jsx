import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from './hooks/useAuth';

// Shared/Core components (Keep static imports for core functionality and better UX)
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import AnimatedRoute from './components/AnimatedRoute';
import Loading from './components/Loading';

// Lazily load page components for better initial load performance
const Home = lazy(() => import('./pages/common/Home'));
const EngHome = lazy(() => import('./pages/common/EngHome'));
const Lessons = lazy(() => import('./pages/features/Lessons'));
const Alphabets = lazy(() => import('./pages/alphabet/Alphabets'));
const Words = lazy(() => import('./pages/word/Words'));
const Sentences = lazy(() => import('./pages/sentence/Sentences'));
const About = lazy(() => import('./pages/common/About'));
const Games = lazy(() => import('./pages/games/Games'));
const AlphabetGame = lazy(() => import('./pages/games/alphabet/AlphabetGame'));
const WordGame = lazy(() => import('./pages/games/word/WordGame'));
const WordScrambleGame = lazy(() => import('./pages/games/word/WordScrambleGame'));
const PictureMatchGame = lazy(() => import('./pages/games/word/PictureMatchGame'));
const SpellingBeeGame = lazy(() => import('./pages/games/word/SpellingBeeGame'));
const SentenceGame = lazy(() => import('./pages/games/sentence/SentenceGame'));
const Speech = lazy(() => import('./pages/speech/Speech'));
const Dashboard = lazy(() => import('./pages/features/Dashboard'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const Login = lazy(() => import('./pages/auth/Login'));
const Grammar = lazy(() => import('./pages/grammar/Grammar'));
const GrammarGame = lazy(() => import('./pages/games/grammar/GrammarGame'));
const AI = lazy(() => import('./pages/AI/Deepseek'));
const Drawing = lazy(() => import('./pages/drawing/Drawing'));
const AlphabetWords = lazy(() => import('./pages/alphabetWords/AlphabetWords'));
const Lesson1 = lazy(() => import('./pages/sentence/lesson1/Lesson1'));
const Feedback = lazy(() => import('./pages/feedback/Feedback'));
const Lesson1Game = lazy(() => import('./pages/sentence/lesson1/Lesson1Game'));
const AmHome = lazy(() => import('./pages/common/AmHome'));
const Hahu = lazy(() => import('./pages/Amharic/hohiat/Hahu'));
const Qalat = lazy(() => import('./pages/Amharic/qalat/Qalat'));
const OromoHome = lazy(() => import('./pages/common/OromoHome'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    /* Suspense is placed outside AnimatePresence to ensure that location-keyed Routes
       can be tracked correctly for entrance/exit animations. */
    <Suspense fallback={<Loading />}>
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
          <Route path="/games/word-scramble" element={<AnimatedRoute><PrivateRoute><WordScrambleGame /></PrivateRoute></AnimatedRoute>} />
          <Route path="/games/picture-match" element={<AnimatedRoute><PrivateRoute><PictureMatchGame /></PrivateRoute></AnimatedRoute>} />
          <Route path="/games/spelling-bee" element={<AnimatedRoute><PrivateRoute><SpellingBeeGame /></PrivateRoute></AnimatedRoute>} />
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
    </Suspense>
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
