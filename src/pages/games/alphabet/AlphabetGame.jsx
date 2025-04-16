import AlphabetQuiz from './AlphabetQuiz';
import MatchUpperandLowerCase from './MatchCases';
import FlipFlopGame from './FlipFlopGame';
import JumpGame from './JumpGame';
import { Link } from 'react-router-dom';
import '../../styles/AlphabetGame.css';

export default function AlphabetGame() {
  return (
    <><div className='AlphabetGame'>
        <AlphabetQuiz />
        <FlipFlopGame className="FlipFlop"/>
        <MatchUpperandLowerCase className="MatchCase"/>
        <JumpGame />
        <div className='alphabetgame-btn'>
          <Link to='/alphabets' className='normal-link '> <button>Back</button> </Link>
          <Link to='/alphabetWords' className='normal-link '> <button>Next</button> </Link>
        </div>
      </div>
    </>
  );
}


