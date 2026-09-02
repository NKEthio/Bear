// components/Feedback.js
import PropTypes from 'prop-types';
// import './Feedback.css';

function Feedback({ message }) {
  return (
    <div className="feedback">
      <p>{message}</p>
    </div>
  );
}

Feedback.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Feedback;