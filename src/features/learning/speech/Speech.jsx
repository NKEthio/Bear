import SpeechToText from "./SpeechToText";
import { Link } from 'react-router-dom';
export default function Speech() {
    return (
        <div>
            <h1>My Speech to Text App</h1>
            <SpeechToText/>
            <div className="road">
            <Link to='/words' className='normal-link '> <button>Next</button> </Link>
            <Link to='/words' className='normal-link '> <button>Next</button> </Link>
            </div>
        </div>
    );
}