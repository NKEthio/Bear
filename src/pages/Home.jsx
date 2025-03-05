import { useRef } from 'react';

import { Link } from 'react-router-dom';
import AlphabetImage from "../assets/Alphabet.JPG";
import WordImage from "../assets/Word.JPG";
import SentenceImage from "../assets/Sentence.JPG";
import GrammarImage from "../assets/Grammar.JPG";
import GameImage from '../assets/Games.JPG';
import "./styles/Home.css";

export default function Home() {
   
    const interactiveLogRef = useRef(null);

    const handleClick = () => {
        interactiveLogRef.current.scrollIntoView({ behaviour: 'smooth '});
    }
    return (
        <div className='home-container'>
            <main>
            <div id="headimg"></div>
            <div id="headText">
                <h1><b>Learn English</b> <br/> with ease</h1>
                <p>This website enables you to learn 
                    and practice English at the same time 
                    having fun with rewards.</p>
                <button onClick={handleClick}><b>Start</b></button>
            </div>
            </main>
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
        </div>
    );
};