import PropTypes from 'prop-types';
import './LanguageSwitcher.css';

const LanguageSwitcher = ({ onLanguageChange }) => {
  return (
<div className='language-switcher'>
      <button onClick={() => onLanguageChange("english")}>English</button>
      <button onClick={() => onLanguageChange("amharic")}>Amharic</button>
      <button onClick={() => onLanguageChange("oromo")}>Oromo</button>
</div>
  );
};

LanguageSwitcher.propTypes = {
  onLanguageChange: PropTypes.func.isRequired,
};

export default LanguageSwitcher;