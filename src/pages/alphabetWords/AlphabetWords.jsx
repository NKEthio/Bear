import { Link } from 'react-router-dom';
import './AlphabetWords.css';

export default function AlphabetWords() {
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
  
  // Function to play sound
  const playSound = (letter, word) => {
    // Play letter sound
    const letterAudio = new Audio(`/Audios/${letter}.mp3`);
    const forAudio = new Audio(`/Audios/For.mp3`);
    const wordAudio = new Audio(`/Audios/${word}.mp3`);

    // Play sounds sequentially
    letterAudio.play()
      .then(() => {
        // When letter sound finishes, play "for"
        letterAudio.onended = () => {
          forAudio.play();
          // When "for" finishes, play word
          forAudio.onended = () => {
            wordAudio.play();
          };
        };
      })
      .catch(error => console.log('Error playing audio:', error));
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