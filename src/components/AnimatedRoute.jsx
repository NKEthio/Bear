import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Hoist static variant and transition objects to prevent recreation on every render cycle.
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const pageTransition = {
  type: 'tween',
  duration: 0.3,
  ease: 'easeInOut',
};

const AnimatedRoute = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

// Proper prop-types validation to eliminate ESLint errors
AnimatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnimatedRoute;
