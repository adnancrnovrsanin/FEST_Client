import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import { Theatre } from "../../common/interfaces/TheatreInterfaces";
import InitialLoader from "../../components/InitialLoader";
import { useNavigate } from "react-router-dom";
import './style.css';
import ScheduleCard from "../../components/ScheduleCard";

const TheatreShows = () => {
    const { userStore, showStore, theatreStore } = useStore();
    const { user } = userStore;
    const { theatreShows, loading, getAllTheatreShows } = showStore;
    const { theatres, getTheatres } = theatreStore;
    const navigation = useNavigate();

    const [managerTheatre, setManagerTheatre] = useState<Theatre | null>(null);

    useEffect(() => {
        (
            async () => {
                if (user) {
                    const managerTheatreVar = theatres.find(theatre => theatre.managerEmail === user.email);
                    if (managerTheatreVar) {
                        setManagerTheatre(managerTheatre);
                        await getAllTheatreShows(managerTheatreVar.id);
                    } else {
                        await getTheatres();
                    }
                }
            }
        )();
    }, [user, getTheatres, theatres, getAllTheatreShows]);

    if (loading) return (
        <InitialLoader adding="shows" />
    );

    return (
        <div className="theatreShowsPageContainer">
            <h1>Your theatre's shows that are appointed a date and time on a festival</h1>

            {
                theatreShows.length > 0 ? (
                    <div className="theatreShows">
                        {
                            theatreShows.map(show => (
                                <ScheduleCard 
                                    show={show}
                                    onClick={() => navigation(`/shows/${show.id}`)}
                                    key={show.id}
                                />
                            ))  
                        }
                    </div>
                ) : (
                    <h2>You have no shows appointed a date and time on a festival</h2>
                )
            }
        </div>
    )
}

export default observer(TheatreShows);