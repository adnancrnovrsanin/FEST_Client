import { observer } from "mobx-react-lite";
import './style.css';
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InitialLoader from "../../components/InitialLoader";

const UnappointedShows = () => {
    const { showStore, theatreStore } = useStore();
    const { unappointedShows, getAllTheatreUnappointedShows, loading: showsLoading } = showStore;
    const { userManagedTheatre, getTheatres, theatres, loading: theatresLoading } = theatreStore;
    const navigate = useNavigate();

    useEffect(() => {
        (
            async () => {
                if (theatres.length === 0) await getTheatres();
                if (userManagedTheatre) await getAllTheatreUnappointedShows(userManagedTheatre.id);
            }
        )();
    }, [userManagedTheatre, getAllTheatreUnappointedShows, theatres, getTheatres]);

    if (showsLoading || theatresLoading) return (
        <InitialLoader adding=" " />
    );

    return (
        <div className="unappointedShowsPageContainer">
            <h1>Here are unappointed shows from the festival that you manage:</h1>

            <div className="showsContainer">
                {
                    unappointedShows.length > 0 ? (
                        unappointedShows.map(show => (
                            <Card sx={{ 
                                width: "300px",
                                height: "200px",
                                margin: "10px",
                                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                                borderRadius: "10px",
                            }}>
                                <CardActionArea
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        padding: "10px",
                                    }}
                                    onClick={() => navigate(`/shows/edit/schedule/${show.id}`)}
                                >
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            gap: "10px",
                                            height: "100%",
                                            padding: "10px",
                                        }}
                                    >
                                        <Typography>
                                            Show name: <span>{show.showName}</span>
                                        </Typography>

                                        <Typography>
                                            Festival name: <span>{show.festivalName}</span>
                                        </Typography>

                                        <Typography>
                                            Theatre name: <span>{show.theatreName}</span>
                                        </Typography>

                                        <Typography>
                                            Length of play: <span>{show.lengthOfPlay}</span>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))
                    ) : (
                        <Typography>
                            There are no unappointed shows for your theatre.
                        </Typography>
                    )
                }
            </div>
        </div>
    );
};

export default observer(UnappointedShows);