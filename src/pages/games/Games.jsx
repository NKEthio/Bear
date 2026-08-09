import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Games.css';

const games = [
    {
        id: 1,
        title: 'Alphabet Games',
        emoji: '🔤',
        description: 'Learn your ABCs with fun quizzes and matching games!',
        path: '/games/alphabets',
        color: '#ff6b6b',
        bgGradient: 'linear-gradient(135deg, #ff6b6b, #ee5253)',
    },
    {
        id: 2,
        title: 'Word Games',
        emoji: '📚',
        description: 'Build your vocabulary with exciting word challenges!',
        path: '/games/words',
        color: '#48dbfb',
        bgGradient: 'linear-gradient(135deg, #48dbfb, #0abde3)',
    },
    {
        id: 3,
        title: 'Word Scramble',
        emoji: '🔀',
        description: 'Unscramble letters to find hidden words!',
        path: '/games/word-scramble',
        color: '#ff9ff3',
        bgGradient: 'linear-gradient(135deg, #ff9ff3, #f368e0)',
    },
    {
        id: 4,
        title: 'Picture Match',
        emoji: '🖼️',
        description: 'Match pictures with their words in this memory game!',
        path: '/games/picture-match',
        color: '#54a0ff',
        bgGradient: 'linear-gradient(135deg, #54a0ff, #2e86de)',
    },
    {
        id: 5,
        title: 'Spelling Bee',
        emoji: '🐝',
        description: 'Listen and spell words correctly to win!',
        path: '/games/spelling-bee',
        color: '#ffd700',
        bgGradient: 'linear-gradient(135deg, #ffd700, #ffb300)',
    },
    {
        id: 6,
        title: 'Sentence Games',
        emoji: '✏️',
        description: 'Build sentences and improve your grammar!',
        path: '/games/sentences',
        color: '#1dd1a1',
        bgGradient: 'linear-gradient(135deg, #1dd1a1, #10ac84)',
    },
];

export default function Games() {
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
        <div className="games-container">
            <motion.h1
                className="games-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                🎮 Game Zone 🎮
            </motion.h1>
            <motion.p
                className="games-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
            >
                Choose a game and start learning while having fun!
            </motion.p>

            <motion.div
                className="games-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {games.map((game) => (
                    <motion.div key={game.id} variants={cardVariants}>
                        <Link to={game.path} className="game-card-link">
                            <motion.div
                                className="game-card"
                                style={{ background: game.bgGradient }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="game-emoji">{game.emoji}</span>
                                <h2 className="game-title">{game.title}</h2>
                                <p className="game-description">{game.description}</p>
                                <div className="play-button">
                                    Play Now! 🚀
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            <div className="games-navigation">
                <Link to="/lessons" className="back-button">
                    ← Back to Lessons
                </Link>
            </div>
        </div>
    );
}