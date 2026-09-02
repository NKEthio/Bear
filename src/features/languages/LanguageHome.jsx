import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function LanguageHome({ title, lang, links, titleClassName = '' }) {
  return (
    <main className="language-home page-shell kid-lang-home" lang={lang}>
      <motion.section
        className="intro-card traditional-card kid-lang-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className={`kid-lang-title ${titleClassName}`.trim()}>{title}</h1>
      </motion.section>

      <section className="quick-links traditional-card kid-links-container">
        <div className="link-grid kid-grid">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`link-tile kid-tile ${link.className || ''}`.trim()}
            >
              <span className="kid-tile-emoji">{link.emoji}</span>
              <h3 className="kid-tile-label">{link.label}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

LanguageHome.propTypes = {
  title: PropTypes.string.isRequired,
  lang: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      className: PropTypes.string,
    })
  ).isRequired,
  titleClassName: PropTypes.string,
};
