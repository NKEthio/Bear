import PropTypes from 'prop-types';

const LanguageSwitcher = ({ onLanguageChange }) => {
  return (
    <li className='lang'>
      <button onClick={() => onLanguageChange("english")}>English</button>
      <button onClick={() => onLanguageChange("amharic")}>Amharic</button>
      <button onClick={() => onLanguageChange("oromo")}>Oromo</button>
    </li>
  );
};

LanguageSwitcher.propTypes = {
  onLanguageChange: PropTypes.func.isRequired,
};

export default LanguageSwitcher;