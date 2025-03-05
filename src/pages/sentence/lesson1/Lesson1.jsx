// { oldWord: "Sun", newWord: "Has", action: "Light", sentence: "Sun Has Light" },
        // { oldWord: "Cloud", newWord: "Makes", action: "Rain", sentence: "Cloud Makes Rain" },
        // { oldWord: "Bird", newWord: "Sings", action: "Song", sentence: "Bird Sings Song" },
        // { oldWord: "Fish", newWord: "Lives", action: "Water", sentence: "Fish Lives Water" },
        // { oldWord: "Moon", newWord: "Shows", action: "Glow", sentence: "Moon Shows Glow" },
        // { oldWord: "Cow", newWord: "Eats", action: "Grass", sentence: "Cow Eats Grass" },
        // { oldWord: "Man", newWord: "Builds", action: "House", sentence: "Man Builds House" },
        // { oldWord: "Baby", newWord: "Wants", action: "Milk", sentence: "Baby Wants Milk" },
        // { oldWord: "Boat", newWord: "Uses", action: "Sail", sentence: "Boat Uses Sail" }
        import React, { useRef } from 'react'; // Import useRef
        import { Link } from 'react-router-dom';
        import './Lesson1.css';
        
        const getImagePath = (word) => `./lesson1/${word}.JPG`;
        const getAudioPath = (word) => `/Audios/${word}.mp3`;
        
        export default function Lesson1() {
            const lessons = [
                { oldWord: "I", newWord: "Eat", action: "Pizza", sentence: "I Eat Pizza" },
                { oldWord: "Dog", newWord: "Sees", action: "Bone", sentence: "Dog Sees Bone" },
                { oldWord: "Cat", newWord: "Likes", action: "Toy", sentence: "Cat Likes Toy" },
                { oldWord: "Boy", newWord: "Holds", action: "Ball", sentence: "Boy Holds Ball" },
                { oldWord: "Girl", newWord: "Draws", action: "Star", sentence: "Girl Draws Star" },
            ];
        
            const audioRef = useRef(new Audio()); // Single Audio instance
        
            const playAudio = (word) => {
                audioRef.current.pause(); // Stop current audio
                audioRef.current.src = getAudioPath(word); // Set new source
                audioRef.current.play().catch((error) => {
                    console.error(`Error playing audio for ${word}:`, error);
                });
            };
        
            return (
                <div className="Lesson1">
                    <h1>Lesson1</h1>
                    <div className="lessons-container">
                        {lessons.map((lesson, index) => (
                            <div key={index} className="lesson-card">
                                <h2>Sentence #{index + 1}</h2>
                                <div className="new-sentence">
                                    <div
                                        className="word-box"
                                        onClick={() => playAudio(lesson.oldWord)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img src={getImagePath(lesson.oldWord)} alt={lesson.oldWord} />
                                        <p>{lesson.oldWord}</p>
                                        <span>(You know this!)</span>
                                    </div>
                                    <div
                                        className="word-box"
                                        onClick={() => playAudio(lesson.newWord)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img src={getImagePath(lesson.newWord)} alt={lesson.newWord} />
                                        <p>{lesson.newWord}</p>
                                        <span>(Learning this!)</span>
                                    </div>
                                    <div
                                        className="word-box"
                                        onClick={() => playAudio(lesson.action)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img src={getImagePath(lesson.action)} alt={lesson.action} />
                                        <p>{lesson.action}</p>
                                        <span>(Action word!)</span>
                                    </div>
                                    <div
                                        className="word-box sentence"
                                        onClick={() => playAudio(lesson.sentence)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img src={getImagePath(lesson.sentence)} alt={lesson.sentence} />
                                        <p>{lesson.sentence}</p>
                                        <span>(Full sentence!)</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='road'>
                        <Link to="/games/words" className="normal-link">
                            <button>Back</button>
                        </Link>
                        <Link to="/games/lesson1" className="normal-link">
                            <button>Next</button>
                        </Link>
                    </div>
                </div>
            );
        }