import { observer } from "mobx-react-lite"
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { useStore } from "../../stores/store";
import { Festival } from "../../common/interfaces/FestivalInterfaces";
import { useEffect, useState } from "react";
import { Role } from "../../common/interfaces/UserInterfaces";

const FestivalPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { festivalStore, userStore } = useStore();
    const { festivals } = festivalStore;
    const { isLoggedIn, user } = userStore;

    useEffect(() => { setSelectedFestival(festivals.find(f => f.id === id) ?? null) }, [festivals, id]);

    const [selectedFestival, setSelectedFestival] = useState<Festival | null>(festivals.find(f => f.id === id) ?? null);

    if (selectedFestival === null) return (<div>404</div>);

    return (
        <div className="festivalPageContainer">
            <div className="festivalDetails">
                <h1>{selectedFestival.name}</h1>
                <h4>{selectedFestival.startDate.toLocaleDateString()} - {selectedFestival.endDate.toLocaleDateString()}</h4>
                <p>{selectedFestival.city}, {selectedFestival.zipCode}</p>

                {
                    isLoggedIn && user?.role === Role.THEATRE_MANAGER && (
                        <div className="festivalActions">
                            <button onClick={() => navigate(`/festivals/${id}/register`)}>
                                Register your theatre's show
                            </button>
                        </div>
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
    )
}

export default observer(FestivalPage);