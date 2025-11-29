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
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { y: 60, opacity: 0, rotateY: -30 },
        visible: {
            y: 0,
            opacity: 1,
            rotateY: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <div className="lessons-container">
            <motion.div
                className="lessons-header"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
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
                                    scale: 1.05,
                                    rotateY: 5,
                                    boxShadow: `0 20px 40px ${lesson.color}60`,
                                }}
                                whileTap={{ scale: 0.95 }}
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
                                    <motion.div
                                        className="start-button"
                                        whileHover={{ scale: 1.1 }}
                                        style={{ backgroundColor: lesson.color }}
                                    >
                                        Start! ➔
                                    </motion.div>
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

            <motion.div
                className="lessons-navigation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <Link to="/engHome" className="nav-button back">
                    ← Back
                </Link>
                <Link to="/alphabets" className="nav-button next">
                    Start Learning →
                </Link>
            </motion.div>

            {/* Floating decorations */}
            <div className="floating-decorations">
                <span className="floating-star" style={{ top: '10%', left: '5%' }}>⭐</span>
                <span className="floating-star" style={{ top: '20%', right: '10%' }}>🌟</span>
                <span className="floating-star" style={{ bottom: '30%', left: '8%' }}>✨</span>
                <span className="floating-star" style={{ bottom: '15%', right: '5%' }}>💫</span>
            </div>
        </div>
    );
}