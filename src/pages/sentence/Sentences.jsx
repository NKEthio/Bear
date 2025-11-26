import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Sentences.css';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-card">
      <motion.h2 onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.98 }}>
        {title}
      </motion.h2>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="accordion-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sentences = () => {
  return (
    <main className="sentences-container" role="main">
      <h1>Understanding Sentences</h1>

      <Accordion title="Definition of a Sentence">
        <p>A sentence is an arrangement of words that makes <strong>complete sense</strong>.</p>
        <p>Every sentence tells something about a <strong>subject</strong> which may be a <strong>person, place, or thing</strong>.</p>
        <p>Examples:</p>
        <ul>
          <li><strong>Mary</strong> is singing a song. (Subject: Mary)</li>
          <li><strong>John</strong> eats a banana. (Subject: John)</li>
          <li><strong>Stop!</strong> (Subject: You - implied)</li>
        </ul>
      </Accordion>

      <Accordion title="Types of Sentences">
        <div className="type-content">
          <h3>1. Statement</h3>
          <p>Statements provide information or facts.</p>
          <ul>
            <li>Clouds bring rain.</li>
            <li>I have not seen her for a long time.</li>
          </ul>
        </div>
        <div className="type-content">
          <h3>2. Interrogative</h3>
          <p>These sentences ask questions.</p>
          <ul>
            <li>What is your name?</li>
            <li>Is she a pretty girl?</li>
          </ul>
        </div>
        <div className="type-content">
          <h3>3. Imperative</h3>
          <p>These sentences express commands, requests, or suggestions.</p>
          <ul>
            <li>Lend me your pen, please.</li>
            <li>Get ready to dance.</li>
          </ul>
        </div>
        <div className="type-content">
          <h3>4. Exclamatory</h3>
          <p>Expresses strong emotions like surprise, anger, or joy.</p>
          <ul>
            <li>What a surprise!</li>
            <li>Terrible!</li>
          </ul>
        </div>
      </Accordion>

      <Accordion title="Structure of a Sentence">
        <p>Every sentence has two parts: <strong>Subject</strong> and <strong>Predicate</strong>.</p>
        <ul>
          <li><span className="subject">Alice</span> <span className="predicate">danced very well.</span></li>
          <li><span className="subject">Boys from the next block</span> <span className="predicate">broke the street lamp.</span></li>
        </ul>
      </Accordion>

      <Accordion title="Parts of Speech">
        <p>Words in a sentence have different <strong>functions</strong>.</p>
        <ol>
          <li>Noun</li>
          <li>Pronoun</li>
          <li>Adjective</li>
          <li>Verb</li>
          <li>Adverb</li>
          <li>Preposition</li>
          <li>Conjunction</li>
          <li>Interjection</li>
        </ol>
      </Accordion>

      <div className="navigation-buttons">
        <Link to="/lessons" className="back-button">Back to Lessons</Link>
        <Link to="/games/sentences" className="next-button">Play a Game</Link>
      </div>
    </main>
  );
};

export default Sentences;