import { observer } from "mobx-react-lite";
import './style.css';
import { useStore } from "../../stores/store";
import { Avatar, Typography } from "@mui/material";
import { stringToColor, stringAvatar } from "../../common/util/usefulFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../AdminNav";
import TheatreManagerNav from "../TheatreManagerNav/TheatreManagerNav";
import ReviewerNav from "../ReviewerNav/ReviewerNav";

const Navbar = () => {
    const { userStore } = useStore();
    const { user, logout, isAdmin } = userStore;
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
            <div className="container">
                <a className="navbar-brand" onClick={() => navigate('/')} >FEST</a>
                {
                    location.pathname !== '/login' && location.pathname !== '/register' && (
                        <>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <Link to="/festivals" className="nav-link" aria-current="page">
                                            Festivals
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/shows" className="nav-link" aria-current="page">
                                            Shows
                                        </Link>
                                    </li>

                                    {
                                        user && isAdmin && (
                                            <AdminNav />
                                        )
                                    }

                                    {
                                        user && user.role === "THEATRE_MANAGER" && (
                                            <TheatreManagerNav />
                                        )
                                    }

                                    {
                                        user && user.role === "REVIEWER" && (
                                            <ReviewerNav />
                                        )
                                    }

                                    {
                                        user ? (
                                            <div className="nav-link dropdown-center">
                                                <div className="navProfile dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <Typography
                                                        style={{
                                                            marginRight: "10px",
                                                            fontSize: "15px",
                                                            fontWeight: "500",
                                                            fontFamily: "Poppins, sans-serif",
                                                            color: "#fff",
                                                        }}
                                                    >
                                                        {user.name + " " + user.surname}
                                                    </Typography>
                                                    
                                                    <Avatar variant="circular" alt="Profile photo" {...stringAvatar(user.name + ' ' + user.surname)} sx={{
                                                        bgcolor: stringToColor(user.email),
                                                        width: "35px",
                                                        height: "35px",
                                                        fontSize: "16px",
                                                    }} />
                                                </div>
                                                <ul className="dropdown-menu profileMenu" data-bs-theme="dark">
                                                    {
                                                         user && user.role === "THEATRE_MANAGER" && (
                                                            <li><a className="dropdown-item" href={`/profile/manager/${user.id}`}>Profile</a></li>
                                                         )
                                                         
                                                    }
                                                    {
                                                        user && user.role === "ACTOR" && (
                                                            <li><a className="dropdown-item" href={`/profile/actor/${user.id}`}>Profile</a></li>
                                                         )
                                                    }
                                                     {
                                                        user && user.role === "REVIEWER" && (
                                                            <li><a className="dropdown-item" href={`/profile/reviewer/${user.id}`}>Profile</a></li>
                                                         )
                                                    }
                                                    <li><a className="dropdown-item" href={`/settings`}>Settings</a></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><a className="dropdown-item" onClick={() => logout()}>Logout</a></li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <li className="nav-item">
                                                <button className="btn btn-outline-light" onClick={() => navigate('/login')}>Login</button>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </>
                    )
                }
            </div>
        </nav>
    );
}

export default observer(Navbar);

