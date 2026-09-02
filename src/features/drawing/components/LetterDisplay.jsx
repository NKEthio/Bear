// components/LetterDisplay.js
import PropTypes from 'prop-types';
// import './LetterDisplay.css';

function LetterDisplay({ letter }) {
  return (
    <div className="letter-display">
      <h2>Practice drawing this letter:</h2>
      <div className="letter">{letter}</div>
    </div>
  );
}

LetterDisplay.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default LetterDisplay;