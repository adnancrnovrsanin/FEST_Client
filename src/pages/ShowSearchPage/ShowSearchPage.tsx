import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader";
import ScheduleCard from "../../components/ScheduleCard";
import './style.css';

const ShowSearchPage = () => {
    const { showStore } = useStore();
    const { theatreShows, getAllShows, loading } = showStore;

    useEffect(() => {
        getAllShows();
    }, [getAllShows]);

    if (loading) return (
        <InitialLoader adding="shows" />
    );

    return (
        <div className="showSearchPageContainer">
            <h1>View shows that are available on all festivals</h1>

            <div className="shows">
                {
                    theatreShows.length > 0 ? (
                        theatreShows.map(show => (
                            <ScheduleCard 
                                show={show}
                                key={show.id}
                                // OnClick={() => navigate(`/shows/${show.id}`)}
                            />
                        ))
                    ) : (
                        <h2>No shows available</h2>
                    )
                }
            </div>
        </div>
    )
}

export default observer(ShowSearchPage);