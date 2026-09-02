import LanguageHome from './LanguageHome';
import '../../styles/EngHome.css';

const LINKS = [
  { to: '/hahu', label: 'ፊደላት', emoji: '🔤', className: 'alphabets-tile' },
  { to: '/qalat', label: 'ቃላት', emoji: '📝', className: 'words-tile' },
  { to: '/speech', label: 'ንግግር', emoji: '🗣️', className: 'speech-tile' },
  { to: '/games', label: 'ጨዋታዎች', emoji: '🎮', className: 'games-tile' },
];

export default function AmHome() {
  return (
    <LanguageHome
      title="አማርኛ ለልጆች! 🐻"
      lang="am"
      links={LINKS}
      titleClassName="am-home-title"
    />
  );
}
