import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import SentenceBuilder from './components/SentenceBuilder';
import SentenceClassifier from './components/SentenceClassifier';
import SubjectPredicate from './components/SubjectPredicate';

import './SentenceGame.css';

export default function SentenceGame() {
  const [activeTab, setActiveTab] = useState('builder');
  const [sessionScore, setSessionScore] = useState(0);
  const [dbScore, setDbScore] = useState(0);
  const [user, setUser] = useState(null);

  // Sync user state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch initial score from firestore
  useEffect(() => {
    const fetchDbScore = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setDbScore(userDoc.data().score || 0);
          }
        } catch (err) {
          console.error('Error fetching user score:', err);
        }
      }
    };
    fetchDbScore();
  }, [user]);

  // Update score callback
  const handleScoreUpdate = useCallback(async (points) => {
    setSessionScore((prev) => prev + points);

    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const currentDbScore = userDoc.exists() ? userDoc.data().score || 0 : 0;
        const newScore = currentDbScore + points;

        await updateDoc(userRef, {
          score: newScore,
          lastUpdated: new Date().toISOString(),
        });
        setDbScore(newScore);
      } catch (err) {
        console.error('Error updating firestore score:', err);
      }
    }
  }, [user]);

  return (
    <div className="sentence-game-container">
      <h1 className="game-title">✏️ Sentence Games ✏️</h1>
      <p className="game-subtitle">Practice word order, sentence types, and parts of sentences while having fun!</p>

      {/* Score Dashboard */}
      <div className="score-board-container">
        <div className="score-card current">
          <div className="score-label">Session Score</div>
          <div className="score-val">+{sessionScore}</div>
        </div>
        {user && (
          <div className="score-card total">
            <div className="score-label">Total Saved Score</div>
            <div className="score-val">✨ {dbScore}</div>
          </div>
        )}
      </div>

      {/* Game Selector Tabs */}
      <div className="game-selector-tabs">
        <button
          className={`tab-btn ${activeTab === 'builder' ? 'active' : ''}`}
          onClick={() => setActiveTab('builder')}
        >
          ✏️ Sentence Builder
        </button>
        <button
          className={`tab-btn ${activeTab === 'classifier' ? 'active' : ''}`}
          onClick={() => setActiveTab('classifier')}
        >
          🔍 Sentence Classifier
        </button>
        <button
          className={`tab-btn ${activeTab === 'subj_pred' ? 'active' : ''}`}
          onClick={() => setActiveTab('subj_pred')}
        >
          🎯 Subject &amp; Predicate
        </button>
      </div>

      {/* Dynamic Game Component Rendering */}
      <div className="game-screen-wrapper">
        {activeTab === 'builder' && <SentenceBuilder onScoreUpdate={handleScoreUpdate} />}
        {activeTab === 'classifier' && <SentenceClassifier onScoreUpdate={handleScoreUpdate} />}
        {activeTab === 'subj_pred' && <SubjectPredicate onScoreUpdate={handleScoreUpdate} />}
      </div>

      {/* Bottom Road/Navigation Buttons */}
      <div className="bottom-nav">
        <Link to="/sentences" className="nav-link-btn back">
          ← Back to Sentences Lesson
        </Link>
        <Link to="/grammar" className="nav-link-btn next">
          Go to Grammar Lesson →
        </Link>
      </div>
    </div>
  );
}
