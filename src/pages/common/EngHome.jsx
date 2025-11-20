import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import "../styles/EngHome.css";

export default function Home() {
    return (
        <div className='home-container'>
            <main>
                <motion.div 
                    id="headText"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10
                        }}
                    >
                        <b>Learn English</b> <br/> with ease
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        This website enables you to learn 
                        and practice English at the same time 
                        having fun with rewards.
                    </motion.p>
                    <Link to='/lessons'>
                        <motion.button
                            whileHover={{ 
                                scale: 1.1,
                                rotate: [0, -3, 3, -3, 0],
                                transition: { duration: 0.5 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <b>Start</b>
                        </motion.button>
                    </Link>
                </motion.div>
            </main>            
        </div>
    );
};