import { Link } from 'react-router-dom';
import "./styles/EngHome.css";

export default function Home() {
    return (
        <div className='home-container'>
            <main>
                <div id="headText">
                    <h1><b>Learn English</b> <br/> with ease</h1>
                    <p>This website enables you to learn 
                        and practice English at the same time 
                        having fun with rewards.</p>
                    <Link to='/lessons'><button><b>Start</b></button></Link>
                </div>
            </main>            
        </div>
    );
};