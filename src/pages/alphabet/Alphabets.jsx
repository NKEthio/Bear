import { Link } from 'react-router-dom';
import SoundButton from '../../components/SoundButton';
import './Alphabets.css';

import soundA from '../../assets/alphabets/A.wav';
import soundB from '../../assets/alphabets/B.wav';
import soundC from '../../assets/alphabets/C.wav';
import soundD from '../../assets/alphabets/D.wav';
import soundE from '../../assets/alphabets/E.wav';
import soundF from '../../assets/alphabets/F.wav';
import soundG from '../../assets/alphabets/G.wav';
import soundH from '../../assets/alphabets/H.wav';
import soundI from '../../assets/alphabets/I.wav';
import soundJ from '../../assets/alphabets/J.wav';
import soundK from '../../assets/alphabets/K.wav';
import soundL from '../../assets/alphabets/L.wav';
import soundM from '../../assets/alphabets/M.wav';
import soundN from '../../assets/alphabets/N.wav';
import soundO from '../../assets/alphabets/O.wav';
import soundP from '../../assets/alphabets/P.wav';
import soundQ from '../../assets/alphabets/Q.wav';
import soundR from '../../assets/alphabets/R.wav';
import soundS from '../../assets/alphabets/S.wav';
import soundT from '../../assets/alphabets/T.wav';
import soundU from '../../assets/alphabets/U.wav';
import soundV from '../../assets/alphabets/V.wav';
import soundW from '../../assets/alphabets/W.wav';
import soundX from '../../assets/alphabets/X.wav';
import soundY from '../../assets/alphabets/Y.wav';
import soundZ from '../../assets/alphabets/Z.wav';

import soundOne from '../../assets/alphabets/One.wav';
import soundTwo from '../../assets/alphabets/Two.wav';
import soundThree from '../../assets/alphabets/Three.wav';
import soundFour from '../../assets/alphabets/Four.wav';
import soundFive from '../../assets/alphabets/Five.wav';
import soundSix from '../../assets/alphabets/Six.wav';
import soundSeven from '../../assets/alphabets/Seven.wav';
import soundEight from '../../assets/alphabets/Eight.wav';
import soundNine from '../../assets/alphabets/Nine.wav';

const alphabetSounds = {
  A: soundA, B: soundB, C: soundC, D: soundD, E: soundE, F: soundF, G: soundG, H: soundH, I: soundI, J: soundJ, K: soundK, L: soundL, M: soundM, N: soundN, O: soundO, P: soundP, Q: soundQ, R: soundR, S: soundS, T: soundT, U: soundU, V: soundV, W: soundW, X: soundX, Y: soundY, Z: soundZ
};

const numberSounds = {
  '1': soundOne, '2': soundTwo, '3': soundThree, '4': soundFour, '5': soundFive, '6': soundSix, '7': soundSeven, '8': soundEight, '9': soundNine
};

const Alphabets = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  const numbers = "123456789".split('');

  return (
    <main className="alphabets-container" role="main">
      <h1>Learn the Alphabet</h1>
      <p>Click on the letters and numbers to hear how they sound.</p>

      <div className="section">
        <h2>Capital Letters</h2>
        <div className="grid-container">
          {letters.map(letter => (
            <SoundButton key={letter} sound={alphabetSounds[letter]} text={letter} />
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Small Letters</h2>
        <div className="grid-container">
          {letters.map(letter => (
            <SoundButton key={letter.toLowerCase()} sound={alphabetSounds[letter]} text={letter.toLowerCase()} />
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Numbers</h2>
        <div className="grid-container">
          {numbers.map(number => (
            <SoundButton key={number} sound={numberSounds[number]} text={number} />
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <Link to="/lessons" className="back-button">Back to Lessons</Link>
        <Link to="/games/alphabets" className="next-button">Play a Game</Link>
      </div>
    </div>
  );
};

export default Alphabets;
