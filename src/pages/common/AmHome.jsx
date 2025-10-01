import { Link } from "react-router-dom"
import "../AmHome.css";

export default function AmHome() {

    return(
        <div lang="am" className="am-home-container">
            <h1>የአማርኛ በይነ መረብ የቤት አቅጣጫ</h1>
            <Link to="/hahu">
                <img src="./Hahu.jpg" alt="ፊደላት" />
                <br />
                <button >ፊደላት</button>
            </Link>
        </div>
    )
}