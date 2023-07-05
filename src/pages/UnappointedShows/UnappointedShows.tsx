import { observer } from "mobx-react-lite";
import './style.css';
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InitialLoader from "../../components/InitialLoader";
import ScheduleCard from "../../components/ScheduleCard";

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
                            <ScheduleCard 
                                show={show}
                                onClick={() => navigate(`/shows/edit/schedule/${show.id}`)}
                                key={show.id}
                            />
                        ))
                    ) : (
                        <Typography
                            sx={{
                                margin: "auto"
                            }}
                        >
                            There are no unappointed shows for your theatre.
                        </Typography>
                    )
                }
            </div>
        </div>
    );
};

export default observer(UnappointedShows);