import { Routes, Route, Link } from 'react-router-dom'

export default function Games() {
    return(
        <div className='Games'>
            <ul>
                <li>
                    <Link to='/games/alphabet' className='normal-link'>Alphabet Game</Link>
                </li>
                <li>
                    <Link to='/games/word' className='normal-link'>Word Game</Link>
                </li>
                <li>
                    <Link to='/games/sentence' className='normal-link'>Sentence Game</Link>
                </li>
            </ul>
        </div>
    );
}