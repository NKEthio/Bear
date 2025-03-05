import { Link } from 'react-router-dom';
export default function SentenceGame() {
    return (
        <div>
            <h1>SentenceGame</h1>
            <h2>Comming soon...</h2>
            <div className='road'>
                <Link to='/sentences' className='normal-link '> <button>Back</button> </Link>
                <Link to='/grammar' className='normal-link '> <button>Next</button> </Link>
            </div>
        </div>
    );
}