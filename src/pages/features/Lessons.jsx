import { Link } from 'react-router-dom';
import { useRef } from 'react';

import AlphabetImage from "../assets/Alphabet.JPG";
import WordImage from "../assets/Word.JPG";
import SentenceImage from "../assets/Sentence.JPG";
import GrammarImage from "../assets/Grammar.JPG";
import GameImage from '../assets/Games.jpg';

import "./styles/EngHome.css";
export default function Lessons() {
    const interactiveLogRef = useRef(null);
    return(
        <>
            <div id="interactiveLog" ref={interactiveLogRef}>
                <figure>
                    <Link to='/alphabets' className='normal-link '>
                        <img src={AlphabetImage} alt="alphabet"/>
                        <br/>
                        <button>Alphabets</button>
                    </Link>
                </figure>
                <figure>
                    <Link to='/words' className='normal-link '>
                        <img src={WordImage} alt="word"/>
                        <br/>
                        <button>Words</button>
                    </Link>
                </figure>
                <figure>
                    <Link to='/sentences' className='normal-link '>
                        <img src={SentenceImage} alt="sentence"/>
                        <br/>
                        <button>Sentences</button>
                    </Link>
                </figure>

                <figure>
                    <Link to='/grammar' className='normal-link'>
                        <img src={GrammarImage} alt="grammar" />
                        <br />
                        <button>Grammar</button>
                    </Link>
                </figure>

                <figure>
                    <Link to='/games' className='normal-link'>
                        <img src={GameImage} alt="Games" />
                        <br />
                        <button>Games</button>
                    </Link>
                </figure>
            </div>
            <div className="road">
                <Link to='/engHome' className='normal-link '> <button>Back</button> </Link>
                <Link to='/alphabets' className='normal-link '> <button>Next</button> </Link>
            </div>
        </>
    );
};