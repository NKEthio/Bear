import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../../styles/WordCubes.css';


const categories = {
  animals: ["Cat", "Dog", "Goat", "Hen"],
  food: ["Bread", "Butter", "Cheese", "Pizza"],
  cloths: ["Belt", "Cap", "Dress", "Jacket"],
  home: ["Bed", "Box", "Cup", "Plate"],
  colors: ["Red", "Blue", "Green", "Yellow"],
  time: ["Clock", "Calendar", "Watch", "Hourglass"],
};

const WordCubes = ({ category = 'animals' }) => {
  // State management
  const [cubes, setCubes] = useState([]);
  const [targetWord, setTargetWord] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Get image path function
  const getImagePath = (category, word) => `/wordImages/${category}/${word}.JPG`;

  // Initialize game with random word from category and set up cubes
  const initializeGame = useCallback(() => {
    console.log('Initializing game with category:', category);
    const words = categories[category] || categories.animals;
    if (!words || words.length === 0) {
      console.error('No words found for category:', category);
      return;
    }
    const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    console.log('Selected target word:', randomWord);
    setTargetWord(randomWord);
    setCurrentWord('');
    setScore(prevScore => prevScore);
    setIsCorrect(false);
    setGameStarted(true);

    // Generate cubes based on the length of the target word
    const uniqueLetters = [...new Set(randomWord.split(''))]; // Get unique letters (e.g., "H", "E", "N" for "HEN")
    const numCubes = randomWord.length; // Number of cubes equals the length of the target word
    console.log('Unique letters:', uniqueLetters, 'Number of cubes:', numCubes);

    // Create cube faces containing only the letters from the target word, repeated for 6 faces
    const cubeFaces = uniqueLetters.map(letter => Array(6).fill(letter)); // Each cube has 6 faces with the same letter

    // Initialize cubes with random faces (0-5), ensuring they don’t match the target word by default
    let newCubes;
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loop
    do {
      newCubes = Array.from({ length: numCubes }, (_, index) => ({
        face: Math.floor(Math.random() * 6),
        letters: cubeFaces[index % uniqueLetters.length], // Cycle through unique letters
      }));
      attempts++;
      if (attempts > maxAttempts) {
        console.warn('Max attempts reached, using default random configuration');
        break;
      }
    } while (newCubes.map(cube => cube.letters[cube.face]).join('') === randomWord);

    console.log('Initialized cubes:', newCubes);
    setCubes(newCubes);
  }, [category]);

  useEffect(() => {
    console.log('useEffect triggered, initializing game...');
    initializeGame();
  }, [initializeGame]);

  // Handle cube rotation (ensure independence)
  const rotateCube = useCallback((cubeIndex) => {
    console.log('Rotating cube at index:', cubeIndex);
    setCubes(prevCubes => {
      if (!prevCubes || prevCubes.length === 0) {
        console.error('No cubes in state to rotate');
        return prevCubes;
      }
      const newCubes = [...prevCubes]; // Create a new array to avoid mutating state directly
      newCubes[cubeIndex] = {
        ...newCubes[cubeIndex],
        face: (newCubes[cubeIndex].face + 1) % 6, // Only update the targeted cube
      };
      console.log('New cubes after rotation:', newCubes);
      return newCubes;
    });
  }, []);

  useEffect(() => {
    if (!gameStarted || !cubes || cubes.length === 0) return;

    const newWord = cubes.map((cube) => cube.letters[cube.face]).join('');
    setCurrentWord(newWord);

    if (newWord === targetWord) {
      setIsCorrect(true);
      setScore((prevScore) => prevScore + 1);
      setTimeout(() => {
        initializeGame();
      }, 1000);
    } else {
      setIsCorrect(false);
    }
  }, [cubes, gameStarted, targetWord, initializeGame]);

  // Handle keyboard input for accessibility
  const handleKeyPress = useCallback((event) => {
    if (!gameStarted) {
      console.log('Game not started, ignoring key press');
      return;
    }
    const key = event.key.toUpperCase();
    console.log('Key pressed:', key);
    const cubeIndex = cubes.findIndex(cube => cube.letters.includes(key));
    if (cubeIndex !== -1) {
      console.log('Found cube for key, rotating at index:', cubeIndex);
      rotateCube(cubeIndex);
    } else {
      console.log('No cube found for key:', key);
    }
  }, [gameStarted, cubes, rotateCube]);

  useEffect(() => {
    console.log('Adding keydown listener');
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      console.log('Removing keydown listener');
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Generate image path for the target word
  const imagePath = getImagePath(category, targetWord.toLowerCase()) || ''; // Use getImagePath function

  // Fallback rendering if cubes aren't ready
  if (!cubes || cubes.length === 0) {
    return <div>Loading...</div>; // Show loading state while cubes initialize
  }

  return (
    <div className="word-cubes-container" role="game" aria-label="Word Cube Game">
      <div className="game-header">
        <img 
          src={imagePath} 
          alt={`Image representing ${targetWord}`} 
          className="target-image"
          onError={(e) => {
            console.error('Image failed to load:', imagePath);
            e.target.style.display = 'none'; // Hide if image fails to load
          }}
        />
        <h2>Form the Word for the Image</h2>
        <p>Current Word: {currentWord}</p>
        <p>Score: {score}</p>
        {isCorrect && <p className="correct">Correct! ✓</p>}
      </div>
      
      <div className="cubes-grid" style={{ gridTemplateColumns: `repeat(${cubes.length}, 120px)` }}>
        {cubes.map((cube, index) => (
          <div 
            key={index}
            className="cube"
            onClick={() => rotateCube(index)}
            onKeyPress={(e) => e.key === 'Enter' && rotateCube(index)}
            tabIndex={0}
            role="button"
            aria-label={`Cube ${index + 1}, showing letter ${cube.letters[cube.face]}`}
            style={{ transform: `rotateY(${cube.face * 60}deg)` }} // Independent 3D rotation
          >
            <div className="cube-face">
              {cube.letters.map((letter, faceIndex) => (
                <span 
                  key={faceIndex} 
                  className={`cube-letter face-${faceIndex}`}
                  style={{ transform: `rotateY(${faceIndex * 60}deg) translateZ(60px)` }} // Depth for faces
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={initializeGame}
        className="restart-button"
        aria-label="Restart Game"
      >
        Restart
      </button>
    </div>
  );
};

WordCubes.propTypes = {
  category: PropTypes.oneOf(Object.keys(categories)).isRequired,
};

export default WordCubes;