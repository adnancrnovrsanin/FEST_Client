import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const TheatreManagerNav = () => {
    return (
        <>
            <li className="nav-item">
                <Link to="/festivals" className="nav-link" aria-current="page">
                    Festivali
                </Link>
            </li>
        </>
    )
}

export default observer(TheatreManagerNav);