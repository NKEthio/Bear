import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import AlphabetImage from "../../assets/Alphabet.JPG";
import WordImage from "../../assets/Word.JPG";
import SentenceImage from "../../assets/Sentence.JPG";
import GrammarImage from "../../assets/Grammar.JPG";
import GameImage from '../../assets/Games.jpg';

import "./Lessons.css";

const lessons = [
    {
        id: 1,
        title: 'Alphabets',
        emoji: '🔤',
        image: AlphabetImage,
        path: '/alphabets',
        description: 'Learn A to Z!',
        color: '#ff6b6b',
    },
    {
        id: 2,
        title: 'Words',
        emoji: '📝',
        image: WordImage,
        path: '/words',
        description: 'Build vocabulary!',
        color: '#48dbfb',
    },
    {
        id: 3,
        title: 'Sentences',
        emoji: '📖',
        image: SentenceImage,
        path: '/sentences',
        description: 'Make sentences!',
        color: '#1dd1a1',
    },
    {
        id: 4,
        title: 'Grammar',
        emoji: '✏️',
        image: GrammarImage,
        path: '/grammar',
        description: 'Learn rules!',
        color: '#5f27cd',
    },
    {
        id: 5,
        title: 'Games',
        emoji: '🎮',
        image: GameImage,
        path: '/games',
        description: 'Play & Learn!',
        color: '#ff9ff3',
    },
];

export default function Lessons() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const cardVariants = {
        hidden: { y: 15, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
    };

    return (
        <div className="lessons-container">
            <motion.div
                className="lessons-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="lessons-title">
                    <span className="title-emoji">📚</span>
                    Choose Your Adventure!
                    <span className="title-emoji">🚀</span>
                </h1>
                <p className="lessons-subtitle">Pick a lesson and start your learning journey!</p>
            </motion.div>

            <motion.div
                className="lessons-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {lessons.map((lesson, index) => (
                    <motion.div
                        key={lesson.id}
                        variants={cardVariants}
                        className="lesson-card-wrapper"
                    >
                        <Link to={lesson.path} className="lesson-link">
                            <motion.div
                                className="lesson-card"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div
                                    className="lesson-card-header"
                                    style={{ backgroundColor: lesson.color }}
                                >
                                    <span className="lesson-number">
                                        {index + 1}
                                    </span>
                                    <span className="lesson-emoji">{lesson.emoji}</span>
                                </div>
                                <div className="lesson-card-body">
                                    <img
                                        src={lesson.image}
                                        alt={lesson.title}
                                        className="lesson-image"
                                    />
                                    <h2 className="lesson-title">{lesson.title}</h2>
                                    <p className="lesson-description">{lesson.description}</p>
                                    <div
                                        className="start-button"
                                        style={{ backgroundColor: lesson.color }}
                                    >
                                        Start! ➔
                                    </div>
                                </div>
                                <div
                                    className="card-decoration"
                                    style={{ borderColor: lesson.color }}
                                />
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            <div className="lessons-navigation">
                <Link to="/engHome" className="nav-button back">
                    ← Back
                </Link>
                <Link to="/alphabets" className="nav-button next">
                    Start Learning →
                </Link>
            </div>
        </div>
    );
}