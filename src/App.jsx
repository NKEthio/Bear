import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase'; // Adjust path based on your structure
import { onAuthStateChanged } from 'firebase/auth';


import Home from './pages/Home';
import Alphabets from './pages/alphabet/Alphabets';
import Words from './pages/word/Words';
import Sentences from './pages/sentence/Sentences';
import About from './pages/About';
import Games from './pages/games/Games';
import AlphabetGame from './pages/games/alphabet/AlphabetGame';
import WordGame from './pages/games/word/WordGame';
import SentenceGame from './pages/games/sentence/SentenceGame';
import Speech from './pages/speech/Speech';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Grammar from './pages/grammar/Grammar';
import GrammarGame from './pages/games/grammar/GrammarGame';
import AI from './pages/AI/Deepseek';
import Drawing from './pages/drawing/Drawing';
import AlphabetWords from './pages/alphabetWords/AlphabetWords';
import Lesson1 from './pages/sentence/lesson1/Lesson1';
import Feedback from './pages/feedback/Feedback';
import Lesson1Game from './pages/sentence/lesson1/Lesson1Game';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking auth state
  }

  // PrivateRoute component to protect routes
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <nav>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={isMenuOpen ? 'open' : ''} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <li><Link to="/" className="normal-link">Home</Link></li>
          <li><Link to="/alphabets" className="normal-link">Alphabets</Link></li>
          <li><Link to="/words" className="normal-link">Words</Link></li>
          <li><Link to="/sentences" className="normal-link">Sentences</Link></li>
          <li><Link to="/speech" className="normal-link">Speech</Link></li>
          <li><Link to="/grammar" className='normal-link'>Grammar</Link></li>
          <li><Link to="/ai" className='normal-link'>AI</Link></li>
          <li><Link to="/games" className="normal-link">Game</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard" className="normal-link">Dashboard</Link></li>
              <li><Link className='normal-link' onClick={() => auth.signOut()}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="normal-link">Login</Link></li>
              <li><Link to="/signup" className="normal-link">Sign Up</Link></li>
            </>
          )}
          <li><Link to="/feedback" className="normal-link">Feedback</Link></li>
          <li><Link to="/about" className="normal-link">About</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/alphabets"
          element={<PrivateRoute><Alphabets /></PrivateRoute>}
        />
        <Route
          path="/words"
          element={<PrivateRoute><Words /></PrivateRoute>}
        />
        <Route 
        path='/lesson1'
        element={<PrivateRoute><Lesson1/></PrivateRoute>}
        />
        <Route
          path="/sentences"
          element={<PrivateRoute><Sentences /></PrivateRoute>}
        />
        <Route
          path="/grammar"
          element={<PrivateRoute><Grammar /></PrivateRoute>}
        />
        <Route
          path="/speech"
          element={<PrivateRoute><Speech /></PrivateRoute>}
        />
        <Route
        path='/drawing'
        element= {<PrivateRoute><Drawing/></PrivateRoute>}
        />
        <Route
        path='/feedback'
        element= {<PrivateRoute><Feedback/></PrivateRoute>}
        />
        <Route
        path='/alphabetWords'
        element= {<PrivateRoute><AlphabetWords/></PrivateRoute>}
        />

        <Route
          path="/games"
          element={<PrivateRoute><Games /></PrivateRoute>}
        />
        <Route
          path="/games/lesson1"
          element={<PrivateRoute><Lesson1Game /></PrivateRoute>}
        />
        <Route
          path="/games/alphabets"
          element={<PrivateRoute><AlphabetGame /></PrivateRoute>}
        />
        <Route
          path="/games/words"
          element={<PrivateRoute><WordGame /></PrivateRoute>}
        />
        <Route
          path="/games/sentences"
          element={<PrivateRoute><SentenceGame /></PrivateRoute>}
        />

        <Route
          path="/games/grammar"
          element={<PrivateRoute><GrammarGame /></PrivateRoute>}
        />

        <Route 
          path="/ai"
          element={<PrivateRoute><AI apiKey="sk-d394ef8c92b541a6adb67cd507b5113a"/></PrivateRoute>}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;