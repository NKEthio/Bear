import '../styles/Words.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Words() {
    const levels = [
        { name: 'animals', words: ["Ant", "Cat", "Cow", "Dog", "Egg", "Goat", "Hen", "Ox", "Pig"] },
        { name: 'food', words: ["Bread", "Butter", "Cheese", "Pizza", "Sandwich"] },
        { name: 'cloths', words: ["Belt", "Cap", "Dress", "Hat", "Jacket", "Skirt", "Shorts", "Socks", "Sweater", "Shirt", "Tie", "Trousers", "Zip"] },
        { name: 'home', words: ["Bed", "Bench", "Box", "Cup", "Fork", "Lamp", "Plate", "Pot", "Roof", "Stair", "Umbrella", "Wall", "Window"] },
        { name: 'time', words: ["Clock", "Calendar", "Watch", "Hourglass"] },
        { name: 'action', words: ["Run", "Jump", "Laugh", "Talk", "Play"] },
        { name: 'colors', words: ["Red", "Blue", "Green", "Orange", "White", "Yellow"] },
        { name: 'shapes', words: ["Circle", "Square", "Triangle", "Rectangle", "Star"] }
    ];

    const [currentLevel, setCurrentLevel] = useState(0); // Start at level 0 (animals)

    const getImagePath = (category, word) => `/wordImages/${category}/${word}.JPG`;
    const getAudioPath = (word) => `/Audios/${word}.mp3`;

    const playAudio = (word) => {
        const audio = new Audio(getAudioPath(word));
        audio.play().catch((error) => {
            console.error(`Error playing audio for ${word}:`, error);
        });
    };

    const handleNextLevel = () => {
        if (currentLevel < levels.length - 1) {
            setCurrentLevel(currentLevel + 1);
        }
    };

    const handlePreviousLevel = () => {
        if (currentLevel > 0) {
            setCurrentLevel(currentLevel - 1);
        }
    };

    const currentCategory = levels[currentLevel];

    return (
        <div className='words-container'>
            <div key={currentCategory.name} id={currentCategory.name}>
                <h1>{currentCategory.name.charAt(0).toUpperCase() + currentCategory.name.slice(1)}</h1>
                <div className="content">
                    {currentCategory.words.map((word) => (
                        <div
                            key={word}
                            className={word}
                            onClick={() => playAudio(word)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={getImagePath(currentCategory.name, word)} alt={word} />
                            <p>{word}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="navigation-buttons">
                <Link to='/alphabetWords' className='normal-link'>
                    <button>ABC</button>
                </Link>
                <button 
                    onClick={handlePreviousLevel} 
                    disabled={currentLevel === 0}
                >
                    Previous
                </button>
                <button 
                    onClick={handleNextLevel} 
                    disabled={currentLevel === levels.length - 1}
                >
                    Next
                </button>
                {currentLevel === levels.length - 1 && (
                    <Link to='/games/words' className='normal-link'>
                        <button>Games</button>
                    </Link>
                )}
            </div>
        </div>
    );
}