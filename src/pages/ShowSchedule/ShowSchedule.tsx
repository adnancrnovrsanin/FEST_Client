import { observer } from "mobx-react-lite";
import './style.css';
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import { ShowSchedule } from "../../common/interfaces/ShowInterfaces";
import moment from "moment";
import { Typography } from "@mui/material";
import InitialLoader from "../../components/InitialLoader";

const ShowSchedule = () => {
    const { id } = useParams<{ id: string }>();
    const { showStore } = useStore();
    const { loading, theatreShows, getAllTheatreShows } = showStore;

    const [schedule, setSchedule] = useState<ShowSchedule | null>(null);

    useEffect(() => {
        if (theatreShows.length === 0)
            getAllTheatreShows(schedule?.theatreId ?? "");
    }, [theatreShows, schedule, getAllTheatreShows]);

    useEffect(() => {
        if (id)
            setSchedule(theatreShows.find(show => show.id === id) || null);
    }, [id, theatreShows]);

    if (loading || !schedule)
        return (
            <InitialLoader adding=" " />
        );

    return (
        <div className="showSchedulePageContainer">
            {
                schedule && (
                    <>
                        <Typography
                            sx={{
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                fontFamily: 'Poppins, sans-serif'
                            }}
                        >
                            {schedule.showName}
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '1.2rem',
                            }}
                        >
                            Starts at: <span style={{ fontWeight: "bold" }}>{moment(schedule.timeOfPlay).format("DD/MM/YYYY HH:mm")}</span>
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '1.2rem',
                            }}
                        >
                            Performing theatre: <span style={{ fontWeight: "bold" }}>{schedule.theatreName}</span>
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '1.2rem',
                            }}
                        >
                            Length of play: <span style={{ fontWeight: "bold" }}>{schedule.lengthOfPlay} minutes</span>
                        </Typography>
                    </>
                )
            }
        </div>
    );
}

export default observer(ShowSchedule);