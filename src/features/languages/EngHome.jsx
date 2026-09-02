import LanguageHome from './LanguageHome';
import '../../styles/EngHome.css';

const LINKS = [
  { to: '/alphabets', label: 'Alphabets', emoji: '🔤', className: 'alphabets-tile' },
  { to: '/words', label: 'Words', emoji: '📝', className: 'words-tile' },
  { to: '/sentences', label: 'Sentences', emoji: '📖', className: 'sentences-tile' },
  { to: '/games', label: 'Games', emoji: '🎮', className: 'games-tile' },
];

export default function EngHome() {
  return <LanguageHome title="English for Kids! 🐻" links={LINKS} />;
}
