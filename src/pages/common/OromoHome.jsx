import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/EngHome.css';

export default function OromoHome() {
  return (
    <main className="language-home page-shell" lang="om">
      <motion.section
        className="intro-card traditional-card"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <h1>Afaan Oromo Baradhu</h1>
        <p>
          Barnoota sirna qabeessa, taphoota, fi shaakala dubbii fayyadamuun Afaan Oromo haala
          salphaa fi bareedaan baradhu.
        </p>
        <Link to="/lessons" className="cta-button" style={{ marginTop: '1rem' }}>
          Barnoota jalqabi
        </Link>
      </motion.section>

      <section className="quick-links traditional-card">
        <h2>Filannoo saffisaa</h2>
        <div className="link-grid">
          <Link to="/alphabets" className="link-tile">
            <h3>Qubee</h3>
            <p>Qubee bu&apos;uuraa saffisaan baradhu.</p>
          </Link>
          <Link to="/words" className="link-tile">
            <h3>Jechoota</h3>
            <p>Jechoota guyyaa guyyaan itti fayyadaman guddisi.</p>
          </Link>
          <Link to="/sentences" className="link-tile">
            <h3>Himoota</h3>
            <p>Sirna himaa fi ijaarsa himaa shaakali.</p>
          </Link>
          <Link to="/games" className="link-tile">
            <h3>Taphoota</h3>
            <p>Barnoota kee taphadhuun cimsadhu.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
