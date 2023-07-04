import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const AdminNav = () => {
    return (
        <>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Festivals
                </a>
                <ul className="dropdown-menu" data-bs-theme="dark">
                    <li>
                        <Link className="dropdown-item" to="/admin/festivals" style={{ color: "inherit" }}>
                            All Festivals
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="/admin/festivals/create" style={{ color: "inherit" }}>
                            Create a new festival
                        </Link>
                    </li>
                </ul>
            </li>

            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Theatres
                </a>
                <ul className="dropdown-menu" data-bs-theme="dark">
                    <li>
                        <Link className="dropdown-item" to="/admin/theatres" style={{ color: "inherit" }}>
                            All Theatres
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="/admin/theatres/create" style={{ color: "inherit" }}>
                            Insert a new theatre
                        </Link>
                    </li>
                </ul>
            </li>
        </>
    )
}

export default observer(AdminNav);