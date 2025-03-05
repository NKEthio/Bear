// components/Feedback.js
import React from 'react';
// import './Feedback.css';

function Feedback({ message }) {
  return (
    <div className="feedback">
      <p>{message}</p>
    </div>
  );
}

export default Feedback;