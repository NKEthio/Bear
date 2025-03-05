import '../styles/Words.css';
import { Link } from 'react-router-dom';

export default function Words() {
    const categories = {
        animals: ["Ant", "Cat", "Cow", "Dog", "Egg", "Goat", "Hen", "Ox", "Pig"],
        food: ["Bread", "Butter", "Cheese", "Pizza", "Sandwich"],
        cloths: ["Belt", "Cap", "Dress", "Hat", "Jacket", "Skirt", "Shorts", "Socks", "Sweater", "Shirt", "Tie", "Trousers", "Zip"],
        home: ["Bed", "Bench", "Box", "Cup", "Fork", "Lamp", "Plate", "Pot", "Roof", "Stair", "Umbrella", "Wall", "Window"],
        colors: ["Red", "Blue", "Green", "Orange", "White", "Yellow"],
        time: ["Clock", "Calendar", "Watch", "Hourglass"],
        action: ["Run", "Jump", "Laugh", "Talk", "Play"]
    };

    const getImagePath = (category, word) => `/wordImages/${category}/${word}.JPG`;
    const getAudioPath = (word) => `/Audios/${word}.mp3`; // New function for audio path

    const playAudio = (word) => {
        const audio = new Audio(getAudioPath(word)); // Create new Audio instance
        audio.play().catch((error) => {
            console.error(`Error playing audio for ${word}:`, error); // Handle playback errors
        });
    };

    return (
        <div className='words-container'>
            {Object.entries(categories).map(([category, words]) => (
                <div key={category} id={category}>
                    <a href={`#${category}`}>
                        <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                    </a>
                    <div className="content">
                        {words.map((word) => (
                            <div
                                key={word}
                                onClick={() => playAudio(word)} // Add click handler
                                style={{ cursor: 'pointer' }} // Optional: Indicate clickability
                            >
                                <img src={getImagePath(category, word)} alt={word} />
                                <p>{word}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div>
                <Link to='/alphabetWords' className='normal-link'>
                    <button>Back</button>
                </Link>
                <Link to='/games/words' className='normal-link'>
                    <button>Next</button>
                </Link>
            </div>
        </div>
    );
}