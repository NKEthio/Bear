import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import "../AmHome.css";

export default function AmHome() {

    return(
        <motion.div 
            lang="am" 
            className="am-home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                    type: "spring",
                    stiffness: 100,
                    delay: 0.2
                }}
            >
                የአማርኛ በይነ መረብ የቤት አቅጣጫ
            </motion.h1>
            <Link to="/hahu">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 150,
                        delay: 0.5
                    }}
                    whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3 }
                    }}
                >
                    <motion.img 
                        src="./Hahu.jpg" 
                        alt="ፊደላት"
                        whileHover={{ 
                            rotate: 360,
                            scale: 1.1,
                            transition: { duration: 0.8 }
                        }}
                    />
                    <br />
                    <motion.button
                        whileHover={{ 
                            scale: 1.15,
                            boxShadow: "0 8px 30px rgba(138, 43, 226, 0.6)"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ፊደላት
                    </motion.button>
                </motion.div>
            </Link>
        </motion.div>
    )
}