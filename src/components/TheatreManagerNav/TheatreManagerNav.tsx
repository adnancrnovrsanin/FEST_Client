import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const TheatreManagerNav = () => {
    return (
        <>
            <li className="nav-item">
                <Link to="/shows/appointed" className="nav-link" aria-current="page">
                    Appointed shows
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/shows/unappointed" className="nav-link" aria-current="page">
                    Unappointed shows
                </Link>
            </li>
        </>
    )
}

export default observer(TheatreManagerNav);