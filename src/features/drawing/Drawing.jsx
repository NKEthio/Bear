// App.js
import { useState } from 'react';
import DrawingCanvas from './components/DrawingCanvas';
import LetterDisplay from './components/LetterDisplay';
import Feedback from './components/Feedback';

function Drawing() {
  const [currentLetter, setCurrentLetter] = useState('A');
  const [userDrawing, setUserDrawing] = useState(null);
  const [feedback, setFeedback] = useState('');

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const checkDrawing = async () => {
    if (!userDrawing) {
      setFeedback(`Please draw the letter ${currentLetter} in the canvas area.`);
      return;
    }
  
    // This is a placeholder for actual image recognition
    const accuracy = Math.random(); // Replace with real ML model
    if (accuracy > 0.7) {
      setFeedback(`Great job! Your ${currentLetter} looks awesome!`);
    } else if (accuracy > 0.4) {
      setFeedback(`Good try! Your ${currentLetter} is getting there. Practice makes perfect!`);
    } else {
      setFeedback(`Let's keep practicing that ${currentLetter}. Try following the example shape.`);
    }
  };

  const nextLetter = () => {
    const currentIndex = letters.indexOf(currentLetter);
    const nextIndex = (currentIndex + 1) % letters.length;
    setCurrentLetter(letters[nextIndex]);
    setUserDrawing(null);
    setFeedback('');
  };

  return (
    <div className="Drawing">
      <h1>Letter Drawing Practice</h1>
      <LetterDisplay letter={currentLetter} />
      <DrawingCanvas setUserDrawing={setUserDrawing} />
      <Feedback message={feedback} />
      <div className="buttons">
        <button onClick={checkDrawing}>Check My Drawing</button>
        <button onClick={nextLetter}>Next Letter</button>
      </div>
    </div>
  );
}

export default Drawing;
