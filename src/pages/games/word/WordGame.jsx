import WordQuiz from "./WordQuiz";
import WordFlipFlopGame from "./WordFlipFlopGame";
import "../../styles/WordGame.css";
import { Link } from 'react-router-dom';
export default function WordGame() {
    return (
        <>
        <WordQuiz/>
        <WordFlipFlopGame/>
        {/* <WordCubes /> */}
        <div className="wordgame-btn">
            <Link to='/words' className='normal-link '> <button>Back</button> </Link>
            <Link to='/lesson1' className='normal-link '> <button>Next</button> </Link>
        </div> 
        </>
    );
};
