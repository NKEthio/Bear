import LanguageHome from './LanguageHome';
import '../../styles/EngHome.css';

const LINKS = [
  { to: '/alphabets', label: 'Qubee', emoji: '🔤', className: 'alphabets-tile' },
  { to: '/words', label: 'Jechoota', emoji: '📝', className: 'words-tile' },
  { to: '/sentences', label: 'Himoota', emoji: '📖', className: 'sentences-tile' },
  { to: '/games', label: 'Taphoota', emoji: '🎮', className: 'games-tile' },
];

export default function OromoHome() {
  return <LanguageHome title="Afaan Oromoo! 🐻" lang="om" links={LINKS} />;
}
