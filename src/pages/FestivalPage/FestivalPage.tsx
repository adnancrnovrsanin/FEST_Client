import { observer } from "mobx-react-lite"
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { useStore } from "../../stores/store";
import { Festival } from "../../common/interfaces/FestivalInterfaces";
import { useEffect, useState } from "react";
import { Role } from "../../common/interfaces/UserInterfaces";
import InitialLoader from "../../components/InitialLoader";
import ScheduleCard from "../../components/ScheduleCard";

const FestivalPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { festivalStore, userStore, showStore } = useStore();
    const { festivals } = festivalStore;
    const { isLoggedIn, user } = userStore;
    const { getAllFestivalShows, loading, festivalShows } = showStore;

    useEffect(() => { setSelectedFestival(festivals.find(f => f.id === id) ?? null) }, [festivals, id]);

    const [selectedFestival, setSelectedFestival] = useState<Festival | null>(festivals.find(f => f.id === id) ?? null);

    useEffect(() => {
        if (selectedFestival)
            getAllFestivalShows(selectedFestival.id);
    }, [selectedFestival, getAllFestivalShows]);

    if (selectedFestival === null) return (<div>404</div>);

    if (loading) return (
        <InitialLoader 
            adding="festival"
        />
    );

    return (
        <div className="festivalPageContainer">
            <div className="festivalHeader">
                <div className="festivalDetails">
                    <h1>{selectedFestival.name}</h1>
                    <h4>{selectedFestival.startDate.toLocaleDateString()} - {selectedFestival.endDate.toLocaleDateString()}</h4>
                    <p>{selectedFestival.city}, {selectedFestival.zipCode}</p>

                    {
                        isLoggedIn && user?.role === Role.THEATRE_MANAGER && (
                            <>
                                <div className="festivalActions">
                                    <button onClick={() => navigate(`/festivals/${id}/register`)}>
                                        Register your theatre's show
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>

                {
                    selectedFestival.organizer && (
                        <div className="organizerDetails">
                            <h2>Organizer:</h2>
                            <h3>{selectedFestival.organizer.name}</h3>
                            <p>Theatre address: {selectedFestival.organizer.address}</p>
                            <p>Theatre contact phone number: {selectedFestival.organizer.phoneNumber}</p>
                        </div>
                    )
                }
            </div>

            <div className="festivalShowsContainer">
                <h2>Shows that are available on this festival:</h2>
                <div className="shows">
                    {
                        festivalShows.length > 0 ? (
                            festivalShows.map(show => (
                                <ScheduleCard 
                                    show={show}
                                    key={show.id}
                                    onClick={() => navigate(`/shows/${show.id}`)}
                                />
                            ))
                        ) : (
                            <h3>No shows available</h3>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(FestivalPage);