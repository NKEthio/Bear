import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AlphabetWords.css';

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
  const letterAudioRef = useRef(null);
  const forAudioRef = useRef(null);
  const wordAudioRef = useRef(null);

  // Clean up audio playback when component unmounts
  useEffect(() => {
    return () => {
      if (letterAudioRef.current) {
        letterAudioRef.current.pause();
        letterAudioRef.current.onended = null;
      }
      if (forAudioRef.current) {
        forAudioRef.current.pause();
        forAudioRef.current.onended = null;
      }
      if (wordAudioRef.current) {
        wordAudioRef.current.pause();
        wordAudioRef.current.onended = null;
      }
    };
  }, []);

  // Function to play sound sequentially and prevent overlap
  const playSound = (letter, word) => {
    // Stop any active playbacks and clear their callbacks
    if (letterAudioRef.current) {
      letterAudioRef.current.pause();
      letterAudioRef.current.onended = null;
    }
    if (forAudioRef.current) {
      forAudioRef.current.pause();
      forAudioRef.current.onended = null;
    }
    if (wordAudioRef.current) {
      wordAudioRef.current.pause();
      wordAudioRef.current.onended = null;
    }

    // Lazily initialize single Audio instances
    if (!letterAudioRef.current) letterAudioRef.current = new Audio();
    if (!forAudioRef.current) forAudioRef.current = new Audio();
    if (!wordAudioRef.current) wordAudioRef.current = new Audio();

    // Set new audio sources
    letterAudioRef.current.src = `/Audios/${letter}.mp3`;
    forAudioRef.current.src = `/Audios/For.mp3`;
    wordAudioRef.current.src = `/Audios/${word}.mp3`;

    // Play sounds in sequence
    letterAudioRef.current.play()
      .then(() => {
        letterAudioRef.current.onended = () => {
          forAudioRef.current.play()
            .then(() => {
              forAudioRef.current.onended = () => {
                wordAudioRef.current.play().catch(error => console.log('Error playing word audio:', error));
              };
            })
            .catch(error => console.log('Error playing "for" audio:', error));
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
}
