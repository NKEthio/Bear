import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/EngHome.css';

export default function AmHome() {
  return (
    <main className="language-home page-shell" lang="am">
      <motion.section
        className="intro-card traditional-card"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <h1 className="am-home-title">አማርኛ በቀላሉ ይማሩ</h1>
        <p>
          የፊደል፣ ቃላት እና የንግግር ልምምድ ክፍሎችን በቀላል እና ዘመናዊ አቀራረብ ይጠቀሙ።
        </p>
        <Link to="/hahu" className="cta-button" style={{ marginTop: '1rem' }}>
          ፊደላት ጀምር
        </Link>
      </motion.section>

      <section className="quick-links traditional-card">
        <h2>ፈጣን አማራጮች</h2>
        <div className="link-grid">
          <Link to="/hahu" className="link-tile">
            <h3>ፊደላት</h3>
            <p>የአማርኛ ፊደላትን እያንዳንዱን ይማሩ።</p>
          </Link>
          <Link to="/qalat" className="link-tile">
            <h3>ቃላት</h3>
            <p>አዲስ ቃላትን እና ትርጉማቸውን ይለማመዱ።</p>
          </Link>
          <Link to="/speech" className="link-tile">
            <h3>ንግግር</h3>
            <p>ትክክለኛ አነጋገር ለማሻሻል ልምምድ ያድርጉ።</p>
          </Link>
          <Link to="/games" className="link-tile">
            <h3>ጨዋታዎች</h3>
            <p>የተማሩትን በመዝናኛ መንገድ ያጠናክሩ።</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
