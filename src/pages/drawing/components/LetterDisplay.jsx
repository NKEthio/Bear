// components/LetterDisplay.js
import React from 'react';
// import './LetterDisplay.css';

function LetterDisplay({ letter }) {
  return (
    <div className="letter-display">
      <h2>Practice drawing this letter:</h2>
      <div className="letter">{letter}</div>
    </div>
  );
}

export default LetterDisplay;