import { observer } from "mobx-react-lite";
import './style.css';
import { useStore } from "../../stores/store";
import InitialLoader from "../../components/InitialLoader";
import { useEffect } from "react";
import FestivalCard from "../../components/FestivalCard/FestivalCard";

const FestivalSearchPage = () => {
    const { festivalStore } = useStore();
    const { festivals, getFestivals, loading } = festivalStore;

    useEffect(() => {
        getFestivals();
    }, []);

    if (loading) return <InitialLoader adding="festivals"/>

    return (
        <div className="festivalSearchPageContainer">
            <h1>Festival Search Page</h1>

            <div className="festivalCards">
                {
                    festivals.map(festival => (
                        <FestivalCard 
                            festival={festival}
                            key={festival.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default observer(FestivalSearchPage);