import { Link } from 'react-router-dom';

export default function grammarGame() {
    return(
        <div>
            <h1>Grammar Game</h1>
            <h2>Comming soon...</h2>
            <div className='road'>
                <Link to='/grammar' className='normal-link '> <button>Back</button> </Link>
                <Link to='/speech' className='normal-link '> <button>Next</button> </Link>
            </div>
        </div>
    );
};