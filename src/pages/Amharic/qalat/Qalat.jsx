import '../styles/Words.css';
// import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Words() {
    const levels = [
        { name: 'animals', words: ["ጉንዳን", "ድመት", "ላም", "ውሻ", "እንቁላል", "ፍየል", "ዶሮ", "በሬ", "አሳማ"] },
        { name: 'food', words: ["ዳቦ", "ቅቤ", "አይብ", "ፒዛ", "ሳንድዊች"] },
        { name: 'clothes', words: ["ቀበቶ", "ካፕ", "ቀሚስ", "ባርኔጣ", "ጃኬት", "ሹራብ", "ሾርት", "ካልሲ", "ሹራብ ረጅም", "ሸሚዝ", "ታይ", "ሱሪ", "ዚፕ"] },
        { name: 'home', words: ["አልጋ", "መኝታ", "ሳጥን", "ኩባያ", "ሹካ", "መብራት", "ሳህን", "ድስት", "ጣሪያ", "መሰላል", "ጃንጥላ", "ግድግዳ", "መስኮት"] },
        { name: 'time', words: ["ሰዓት", "ቀን መቁጠሪያ", "እጅ ሰዓት", "የአሸዋ ሰዓት"] },
        { name: 'action', words: ["መሮጥ", "መዝለል", "መሳቅ", "መነጋገር", "መጫወት"] },
        { name: 'colors', words: ["ቀይ", "ሰማያዊ", "አረንጓዴ", "ብርቱካን", "ነጭ", "ቢጫ"] },
        { name: 'shapes', words: ["ክብ", "ካሬ", "ትሪያንግል", "አራት ማዕዘን", "ኮከብ"] }
    ];

    const [currentLevel, setCurrentLevel] = useState(0); // Start at level 0 (animals)

    const getImagePath = (category, word) => `/wordImages/Amharic/${category}/${word}.JPG`;
    const getAudioPath = (word) => `/Audios/${word}.mp3`;

    const playAudio = (word) => {
        const audio = new Audio(getAudioPath(word));
        audio.play().catch((error) => {
            console.error(`Error playing audio for ${word}:`, error);
        });
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
        </div>
    );
}