import { Link } from 'react-router-dom';
import Game1 from "./components/Lesson1Game1"; // Import Game 1
import Game2 from "./components/Lesson1Game2"; // Import Game 2
import Game3 from "./components/Lesson1Game3"; // Import Game 3
import "./Lesson1Game.css"; // Import the stylesheet

const Lesson1Game = () => {
    return (
        <div className="lesson1-game">
            <h1>Lesson 1 Games</h1>
            <div className="games-container">
                <Game1 />
                <Game2 />
                <Game3 />
            </div>
            <div className="road">
                <Link to="/lesson1" className="normal-link">
                    <button>Back</button>
                </Link>
                <Link to="/sentences" className="normal-link">
                    <button>Next</button>
                </Link>
            </div>
        </div>

    );
};

export default Lesson1Game;