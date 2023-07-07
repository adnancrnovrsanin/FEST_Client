import { observer } from "mobx-react-lite";
import './style.css';
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import moment from "moment";
import { Typography } from "@mui/material";
import InitialLoader from "../../components/InitialLoader";

const ShowSchedulePage = () => {
    const { id } = useParams<{ id: string }>();
    const { showStore, userStore,showRoleStore } = useStore();
    const { loading, theatreShows, getShow, selectedShow, setSelectedShow } = showStore;
    const { loading: showRolesLoading, showRoles } = showRoleStore;
    const { user } = userStore;
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            (
                async () => {
                    const result = theatreShows.find(show => show.id === id);
                    if (result) {
                        setSelectedShow(result);
                    } else await getShow(id);
                }
            )();
        }
    }, [id, theatreShows, getShow, setSelectedShow]);

    if (loading || !selectedShow || showRolesLoading)
        return (
            <InitialLoader adding=" " />
        );

    return (
        <div className="showSchedulePageContainer">
            <Typography
                sx={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    fontFamily: 'Poppins, sans-serif'
                }}
            >
                {selectedShow.showName}
            </Typography>

            {
                user?.role === "THEATRE_MANAGER" && selectedShow.managerEmail === user.email && (
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '1.2rem',
                            color: 'red',
                            marginBottom: '1rem'
                        }}
                    >
                        {selectedShow.numberOfActors - showRoles.length} roles needs to be added for this show.
                    </Typography>
                )
            }

            <Typography
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                }}
            >
                Starts at: <span style={{ fontWeight: "bold" }}>{selectedShow.timeOfPlay === null ? "Starting date and time comming soon" : moment(selectedShow.timeOfPlay).format("DD/MM/YYYY HH:mm")}</span>
            </Typography>

            <Typography
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                }}
            >
                Performing theatre: <span style={{ fontWeight: "bold" }}>{selectedShow.theatreName}</span>
            </Typography>

            <Typography
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                }}
            >
                Length of play: <span style={{ fontWeight: "bold" }}>{selectedShow.lengthOfPlay} minutes</span>
            </Typography>

            <Typography
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                }}
            >
                Number of actors in this show: <span style={{ fontWeight: "bold" }}>{selectedShow.numberOfActors}</span>
            </Typography>

            <Typography
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                }}
            >
                <span style={{ fontWeight: "bold" }}>Description:</span> {selectedShow.showAdditionalInformation}
            </Typography>

            {
                user?.role === "THEATRE_MANAGER" && selectedShow.managerEmail === user.email && (
                    <button 
                        onClick={() => navigate(`/show/${selectedShow.id}/createRole`)}
                    >
                        Create a new role for this show
                    </button>
                )
            }

            <div className="showRolesContainer">
                <h3>Roles in this show:</h3>
                {
                    showRoles.map(showRole => (
                        <div
                            key={showRole.id}
                            className="showRole"
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {`${showRole.showRoleName} ->`}
                            </Typography>

                            {
                                showRole.actor !== null && (
                                    <Typography
                                        sx={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {showRole.actor.name} {showRole.actor.surname}
                                    </Typography>
                                )
                            }

                            {
                                showRole.actor === null && (
                                    <>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Poppins, sans-serif',
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            No actor assigned to this role yet.
                                        </Typography>

                                        {
                                            user?.role === "ACTOR" && !showRoles.find(sr => sr.actor?.email === user.email) && (
                                                <button 
                                                    onClick={() => navigate(`/shows/${showRole.id}/apply`)}
                                                >
                                                    Apply for audition for this role
                                                </button>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default observer(ShowSchedulePage);