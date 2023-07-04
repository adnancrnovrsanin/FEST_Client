import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const TheatreManagerNav = () => {
    return (
        <>
            <li className="nav-item">
                <Link to="/festivals" className="nav-link" aria-current="page">
                    Festivals
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