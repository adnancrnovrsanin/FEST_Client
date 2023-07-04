import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import './style.css';
import { Typography } from "@mui/material";
import { useStore } from "../../stores/store";
import { Festival, ShowFestivalApplication } from "../../common/interfaces/FestivalInterfaces";
import { useEffect, useState } from "react";
import { Theatre } from "../../common/interfaces/TheatreInterfaces";

const FestivalApplication = () => {
    const { id } = useParams();
    const { festivalApplicationStore, festivalStore, theatreStore, userStore } = useStore();
    const { festivalApplications, loading, reviewFestivalApplication } = festivalApplicationStore;
    const { festivals } = festivalStore;
    const { theatres } = theatreStore;
    const { user } = userStore;

    const [selectedFestivalApplication, setSelectedFestivalApplication] = useState<ShowFestivalApplication | null>(null);
    const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
    const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null);

    useEffect(() => {
        festivalApplicationStore.getAllFestivalApplications();
    }, [festivalApplicationStore]);

    useEffect(() => {
        if (id) {
            setSelectedFestivalApplication(festivalApplications.find(f => f.id === id) ?? null);
        }
    }, [id, festivalApplications]);

    useEffect(() => {
        if (selectedFestivalApplication) {
            setSelectedFestival(festivals.find(f => f.id === selectedFestivalApplication.festivalId) ?? null);
            setSelectedTheatre(theatres.find(t => t.id === selectedFestivalApplication.theatreId) ?? null);
        }
    }, [selectedFestivalApplication, festivals, theatres]);

    if (selectedFestivalApplication === null || selectedFestival == null || selectedTheatre == null) return (<div>404</div>);

    return (
        <div className="festivalApplicationPageContainer">
            <h1>Festival Application</h1>

            <div className="festivalApplicationDetails">
                <Typography
                    sx={{
                        fontSize: "1.1rem",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    Show name: 
                    <span style={{ 
                        fontWeight: "bold", 
                        fontSize: "2.25rem",
                        marginLeft: "10px"
                    }}>
                        {selectedFestivalApplication.name}
                    </span>
                </Typography>

                <Typography
                    sx={{
                        fontSize: "1.1rem",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    Story writer name:: 
                    <span style={{ 
                        fontWeight: "bold", 
                        fontSize: "1.25rem",
                        marginLeft: "10px"
                    }}>
                        {selectedFestivalApplication.storyWriterName}
                    </span>
                </Typography>

                <Typography
                    sx={{
                        fontSize: "1.1rem",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    Director name: 
                    <span style={{ 
                        fontWeight: "bold", 
                        fontSize: "1.25rem",
                        marginLeft: "10px"
                    }}>
                        {selectedFestivalApplication.directorName}
                    </span>
                </Typography>

                <Typography
                    sx={{
                        fontSize: "1.1rem",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    Length of play (in minutes): 
                    <span style={{ 
                        fontWeight: "bold", 
                        fontSize: "1.25rem",
                        marginLeft: "10px"
                    }}>
                        {selectedFestivalApplication.lengthOfPlay}
                    </span>
                </Typography>

                <Typography
                    sx={{
                        fontSize: "1.1rem",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    Expected number of actors in the show: 
                    <span style={{ 
                        fontWeight: "bold", 
                        fontSize: "1.25rem",
                        marginLeft: "10px"
                    }}>
                        {selectedFestivalApplication.numberOfActors}
                    </span>
                </Typography>

                <Typography
                    sx={{
                        fontSize: "1.1rem",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    Additional information: 
                    <span style={{ 
                        fontWeight: "bold", 
                        fontSize: "1.25rem",
                        marginLeft: "10px"
                    }}>
                        {selectedFestivalApplication.additionalInformation}
                    </span>
                </Typography>

                {
                    user && user.role === "REVIEWER" && (
                        <>
                            <button className="btn btn-dark mt-3"
                                onClick={() => reviewFestivalApplication(selectedFestivalApplication.id, true)}
                            >
                                {
                                    loading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span>
                                            Mark show as acceptable
                                        </span>
                                    )
                                }
                            </button>

                            <button className="btn btn-dark mt-3"
                                onClick={() => reviewFestivalApplication(selectedFestivalApplication.id, false)}
                            >
                                {
                                    loading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span>
                                            Mark show as not acceptable
                                        </span>
                                    )
                                }
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default observer(FestivalApplication);