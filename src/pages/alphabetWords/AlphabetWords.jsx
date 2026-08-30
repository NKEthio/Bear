import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import './AlphabetWords.css';

// Hoist static constants outside of the component to prevent re-allocating them on every render
const alphabetWords = [
  { letter: "A", word: "Apple" },
  { letter: "B", word: "Ball" },
  { letter: "C", word: "Cat" },
  { letter: "D", word: "Dog" },
  { letter: "E", word: "Eagle" },
  { letter: "F", word: "Fish" },
  { letter: "G", word: "Goat" },
  { letter: "H", word: "Hen" },
  { letter: "I", word: "Ink" },
  { letter: "J", word: "Jug" },
  { letter: "K", word: "Kite" },
  { letter: "L", word: "Lion" },
  { letter: "M", word: "Monkey" },
  { letter: "N", word: "Nest" },
  { letter: "O", word: "Owl" },
  { letter: "P", word: "Pig" },
  { letter: "Q", word: "Queen" },
  { letter: "R", word: "Rat" },
  { letter: "S", word: "Sun" },
  { letter: "T", word: "Tiger" },
  { letter: "U", word: "Umbrella" },
  { letter: "V", word: "Van" },
  { letter: "W", word: "Watch" },
  { letter: "X", word: "Xylophone" },
  { letter: "Y", word: "Yoyo" },
  { letter: "Z", word: "Zebra" },
];

const getImagePath = (word) => `/alphabetWords/${word}.JPG`;

export default function AlphabetWords() {
  // Use a single, reusable Audio element inside a useRef to prevent allocating new Audio nodes on every click,
  // which significantly reduces garbage collection overhead and ensures only one sequence plays at a time (preventing overlaps).
  const audioRef = useRef(null);

  useEffect(() => {
    // Lazily initialize single audio channel
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Function to play sound sequentially and responsively
  const playSound = (letter, word) => {
    if (!audioRef.current) return;

    // Stop currently playing audio and reset event handlers
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.onended = null;

    // Play "Letter" sound
    audioRef.current.src = `/Audios/${letter}.mp3`;
    audioRef.current.play()
      .then(() => {
        if (!audioRef.current) return;
        audioRef.current.onended = () => {
          if (!audioRef.current) return;
          // Play "For" sound
          audioRef.current.src = `/Audios/For.mp3`;
          audioRef.current.play()
            .then(() => {
              if (!audioRef.current) return;
              audioRef.current.onended = () => {
                if (!audioRef.current) return;
                // Play "Word" sound
                audioRef.current.src = `/Audios/${word}.mp3`;
                audioRef.current.play()
                  .then(() => {
                    if (!audioRef.current) return;
                    audioRef.current.onended = null;
                  })
                  .catch(error => console.log('Error playing word audio:', error));
              };
            })
            .catch(error => console.log('Error playing "For" audio:', error));
        };
      })
      .catch(error => console.log('Error playing letter audio:', error));
  };

  return (
    <div className='alphabet-word-container'>
      <div className="alphabet-word">
        {alphabetWords.map((alphabetWord) => {
          const firstLetter = alphabetWord.word[0];
          const restOfWord = alphabetWord.word.slice(1);
          return (
            <div key={alphabetWord.word}>
              <img 
                src={getImagePath(alphabetWord.word)} 
                alt={alphabetWord.word} 
                onClick={() => playSound(alphabetWord.letter, alphabetWord.word)}
                style={{ cursor: 'pointer' }} // Adds pointer cursor to indicate clickability
              />
              <p onClick={() => playSound(alphabetWord.letter, alphabetWord.word)} style={{ cursor: 'pointer' }}>
                {alphabetWord.letter} for <span className="word-first-letter">{firstLetter}</span>{restOfWord}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className='road'>
        <Link to='/games/alphabets' className='normal-link '> <button>Back</button> </Link>
        <Link to='/words' className='normal-link '> <button>Next</button> </Link>
      </div>
    </div>
  );
};