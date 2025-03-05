import { useRef } from 'react';
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
import '../styles/Alphabets.css';
import { Link } from 'react-router-dom';

export default function Alphabets() {
    const audioRefA = useRef(null);
    const audioRefB = useRef(null);
    const audioRefC = useRef(null);
    const audioRefD = useRef(null);
    const audioRefE = useRef(null);
    const audioRefF = useRef(null);
    const audioRefG = useRef(null);
    const audioRefH = useRef(null);
    const audioRefI = useRef(null);
    const audioRefJ = useRef(null);
    const audioRefK = useRef(null);
    const audioRefL = useRef(null);
    const audioRefM = useRef(null);
    const audioRefN = useRef(null);
    const audioRefO = useRef(null);
    const audioRefP = useRef(null);
    const audioRefQ = useRef(null);
    const audioRefR = useRef(null);
    const audioRefS = useRef(null);
    const audioRefT = useRef(null);
    const audioRefU = useRef(null);
    const audioRefV = useRef(null);
    const audioRefW = useRef(null);
    const audioRefX = useRef(null);
    const audioRefY = useRef(null);
    const audioRefZ = useRef(null);

    const audioRefOne = useRef(null);
    const audioRefTwo = useRef(null);
    const audioRefThree = useRef(null);
    const audioRefFour = useRef(null);
    const audioRefFive = useRef(null);
    const audioRefSix = useRef(null);
    const audioRefSeven = useRef(null);
    const audioRefEight = useRef(null);
    const audioRefNine = useRef(null);

    const playSound = (audioRef) => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    }
    return(
        <div className='alphabet-container'>
            <h1>Alphabets</h1>
            <h2>Capital Letters</h2>
            <div className='alphabets' id='caps'>
                <button onClick={() => playSound(audioRefA)}>A</button>
                <button onClick={() => playSound(audioRefB)}>B</button>
                <button onClick={() => playSound(audioRefC)}>C</button>
                <button onClick={() => playSound(audioRefD)}>D</button>
                <button onClick={() => playSound(audioRefE)}>E</button>
                <button onClick={() => playSound(audioRefF)}>F</button>
                <button onClick={() => playSound(audioRefG)}>G</button>
                <button onClick={() => playSound(audioRefH)}>H</button>
                <button onClick={() => playSound(audioRefI)}>I</button>
                <button onClick={() => playSound(audioRefJ)}>J</button>
                <button onClick={() => playSound(audioRefK)}>K</button>
                <button onClick={() => playSound(audioRefL)}>L</button>
                <button onClick={() => playSound(audioRefM)}>M</button>
                <button onClick={() => playSound(audioRefN)}>N</button>
                <button onClick={() => playSound(audioRefO)}>O</button>
                <button onClick={() => playSound(audioRefP)}>P</button>
                <button onClick={() => playSound(audioRefQ)}>Q</button>
                <button onClick={() => playSound(audioRefR)}>R</button>
                <button onClick={() => playSound(audioRefS)}>S</button>
                <button onClick={() => playSound(audioRefT)}>T</button>
                <button onClick={() => playSound(audioRefU)}>U</button>
                <button onClick={() => playSound(audioRefV)}>V</button>
                <button onClick={() => playSound(audioRefW)}>W</button>
                <button onClick={() => playSound(audioRefX)}>X</button>
                <button onClick={() => playSound(audioRefY)}>Y</button>
                <button onClick={() => playSound(audioRefZ)}>Z</button>

                <audio ref={audioRefA} src={soundA} />
                <audio ref={audioRefB} src={soundB} />
                <audio ref={audioRefC} src={soundC} />
                <audio ref={audioRefD} src={soundD} />
                <audio ref={audioRefE} src={soundE} />
                <audio ref={audioRefF} src={soundF} />
                <audio ref={audioRefG} src={soundG} />
                <audio ref={audioRefH} src={soundH} />
                <audio ref={audioRefI} src={soundI} />
                <audio ref={audioRefJ} src={soundJ} />
                <audio ref={audioRefK} src={soundK} />
                <audio ref={audioRefL} src={soundL} />
                <audio ref={audioRefM} src={soundM} />
                <audio ref={audioRefN} src={soundN} />
                <audio ref={audioRefO} src={soundO} />
                <audio ref={audioRefP} src={soundP} />
                <audio ref={audioRefQ} src={soundQ} />
                <audio ref={audioRefR} src={soundR} />
                <audio ref={audioRefS} src={soundS} />
                <audio ref={audioRefT} src={soundT} />
                <audio ref={audioRefU} src={soundU} />
                <audio ref={audioRefV} src={soundV} />
                <audio ref={audioRefW} src={soundW} />
                <audio ref={audioRefX} src={soundX} />
                <audio ref={audioRefY} src={soundY} />
                <audio ref={audioRefZ} src={soundZ} />

                <audio ref={audioRefOne} src={soundOne} />
                <audio ref={audioRefTwo} src={soundTwo} />
                <audio ref={audioRefThree} src={soundThree} />
                <audio ref={audioRefFour} src={soundFour} />
                <audio ref={audioRefFive} src={soundFive} />
                <audio ref={audioRefSix} src={soundSix} />
                <audio ref={audioRefSeven} src={soundSeven} />
                <audio ref={audioRefEight} src={soundEight} />
                <audio ref={audioRefNine} src={soundNine} />
            </div>

            <h2>Small Letters</h2>
            <div class="alphabets" id="smls">
                <button onClick={() => playSound(audioRefA)}>a</button>
                <button onClick={() => playSound(audioRefB)}>b</button>
                <button onClick={() => playSound(audioRefC)}>c</button>
                <button onClick={() => playSound(audioRefD)}>d</button>
                <button onClick={() => playSound(audioRefE)}>e</button>
                <button onClick={() => playSound(audioRefF)}>f</button>
                <button onClick={() => playSound(audioRefG)}>g</button>
                <button onClick={() => playSound(audioRefH)}>h</button>
                <button onClick={() => playSound(audioRefI)}>i</button>
                <button onClick={() => playSound(audioRefJ)}>j</button>
                <button onClick={() => playSound(audioRefK)}>k</button>
                <button onClick={() => playSound(audioRefL)}>l</button>
                <button onClick={() => playSound(audioRefM)}>m</button>
                <button onClick={() => playSound(audioRefN)}>n</button>
                <button onClick={() => playSound(audioRefO)}>o</button>
                <button onClick={() => playSound(audioRefP)}>p</button>
                <button onClick={() => playSound(audioRefQ)}>q</button>
                <button onClick={() => playSound(audioRefR)}>r</button>
                <button onClick={() => playSound(audioRefS)}>s</button>
                <button onClick={() => playSound(audioRefT)}>t</button>
                <button onClick={() => playSound(audioRefU)}>u</button>
                <button onClick={() => playSound(audioRefV)}>v</button>
                <button onClick={() => playSound(audioRefW)}>w</button>
                <button onClick={() => playSound(audioRefX)}>x</button>
                <button onClick={() => playSound(audioRefY)}>y</button>
                <button onClick={() => playSound(audioRefZ)}>z</button>
            </div>

            <h2>Numbers</h2>
            <div class="numbers" id="nums">
                <button onClick={() => playSound(audioRefOne)}>1</button>
                <button onClick={() => playSound(audioRefTwo)}>2</button>
                <button onClick={() => playSound(audioRefThree)}>3</button>
                <button onClick={() => playSound(audioRefFour)}>4</button>
                <button onClick={() => playSound(audioRefFive)}>5</button>
                <button onClick={() => playSound(audioRefSix)}>6</button>
                <button onClick={() => playSound(audioRefSeven)}>7</button>
                <button onClick={() => playSound(audioRefEight)}>8</button>
                <button onClick={() => playSound(audioRefNine)}>9</button>
            </div>

            <div>
                <Link to='/' className='normal-link '> <button>Back</button> </Link>
                <Link to='/games/alphabets' className='normal-link '> <button>Next</button> </Link>
            </div>
        </div>
    );
}