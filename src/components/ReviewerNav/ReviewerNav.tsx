import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ReviewerNav = () => {
    return (
        <>
            <li className="nav-item">
                <Link to="/festivals/applications" className="nav-link" aria-current="page">
                    Festival applications
                </Link>
            </li>
        </>
    );
}

export default observer(ReviewerNav);