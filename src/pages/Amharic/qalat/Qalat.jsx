import './Qalat.css';
import { useState } from 'react';

// Define levels outside the component (or inside if preferred, but outside is common for constants)
const levels = [
    { name: 'animals', name_am: 'እንስሳት', words: ["ጉንዳን", "ድመት", "ላም", "ውሻ", "እንቁላል", "ፍየል", "ዶሮ", "በሬ", "አሳማ"] },
    { name: 'food', name_am: 'ምግቦች', words: ["ዳቦ", "ቅቤ", "አይብ", "ፒዛ", "ሳንድዊች"] },
    { name: 'clothes', name_am: 'ልብሶች', words: ["ቀበቶ", "ካፕ", "ቀሚስ", "ባርኔጣ", "ጃኬት", "ሹራብ", "ሾርት", "ካልሲ", "ሹራብ ረጅም", "ሸሚዝ", "ታይ", "ሱሪ", "ዚፕ"] },
    { name: 'home', name_am: 'የቤት እቃዎች', words: ["አልጋ", "መኝታ", "ሳጥን", "ኩባያ", "ሹካ", "መብራት", "ሳህን", "ድስት", "ጣሪያ", "መሰላል", "ጃንጥላ", "ግድግዳ", "መስኮት"] },
    { name: 'time', name_am: 'ጊዜ', words: ["ሰዓት", "ቀን መቁጠሪያ", "እጅ ሰዓት", "የአሸዋ ሰዓት"] },
    { name: 'action', name_am: 'ድርጊቶች', words: ["መሮጥ", "መዝለል", "መሳቅ", "መነጋገር", "መጫወት"] },
    { name: 'colors', name_am: 'ቀለማት', words: ["ቀይ", "ሰማያዊ", "አረንጓዴ", "ብርቱካን", "ነጭ", "ቢጫ"] },
    { name: 'shapes', name_am: 'ቅርጾች', words: ["ክብ", "ካሬ", "ትሪያንግል", "አራት ማዕዘን", "ኮከብ"] }
];

export default function Words() {
    const [currentLevel, setCurrentLevel] = useState(0); // Index of the current level

    const getImagePath = (category, word) => `/wordImages/Amharic/${category}/${word}.JPG`;
    const getAudioPath = (word) => `/Audios/${word}.mp3`;

    const playAudio = (word) => {
        const audio = new Audio(getAudioPath(word));
        audio.play().catch((error) => {
            console.error(`Error playing audio for ${word}:`, error);
        });
    };

    // --- Navigation Functions ---
    const handleNextLevel = () => {
        setCurrentLevel((prevLevel) => (prevLevel + 1) % levels.length); // Wrap around to the start
    };

    const handlePreviousLevel = () => {
        setCurrentLevel((prevLevel) => (prevLevel - 1 + levels.length) % levels.length); // Wrap around to the end
    };
    // --- End Navigation Functions ---

    const currentCategory = levels[currentLevel]; // Get the category object based on the current index

    return (
        <div className='qalat-container'>

            {/* --- Level Navigation Buttons --- */}
            {levels.length > 1 && ( // Only show buttons if there's more than one level
                <div className="level-navigation">
                    <button onClick={handlePreviousLevel} className="nav-button prev-button">
                        ቀዳሚ {/* Previous */}
                    </button>
                    <button onClick={handleNextLevel} className="nav-button next-button">
                        ቀጣይ {/* Next */}
                    </button>
                </div>
            )}
            {/* --- End Level Navigation Buttons --- */}

            {/* Use category name as key to help React differentiate when level changes */}
            <div key={currentCategory.name} id={currentCategory.name}>
                 {/* Display Amharic name if available, otherwise fallback to English name */}
                <h1>{currentCategory.name_am || (currentCategory.name.charAt(0).toUpperCase() + currentCategory.name.slice(1))}</h1>
                <div className="qalat-content">
                    {currentCategory.words.map((word) => (
                        <div
                            key={word}
                            // Added 'word-item' class for consistent styling
                            className={`word-item ${word}am`}
                            onClick={() => playAudio(word)}
                            // Removed inline cursor style, handle in CSS
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