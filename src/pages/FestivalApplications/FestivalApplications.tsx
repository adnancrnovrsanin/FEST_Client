import { observer } from "mobx-react-lite";
import './style.css';
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FestivalApplications = () => {
    const { festivalApplicationStore, festivalStore, theatreStore } = useStore();
    const { festivalApplications, getAllFestivalApplications, loading } = festivalApplicationStore;
    const { festivals } = festivalStore;
    const { theatres } = theatreStore;
    const navigate = useNavigate();

    useEffect(() => {
        getAllFestivalApplications();
    }, [getAllFestivalApplications]);

    if (loading) return <InitialLoader adding="applications"/>;

    return (
        <div className="festivalApplicationsPageContainer">
            <h1>Festival applications</h1>

            <div className="festivalApplications">
                {
                    festivalApplications.map(festivalApplication => {
                        const festival = festivals.find(festival => festival.id === festivalApplication.festivalId);
                        const theatre = theatres.find(theatre => theatre.id === festivalApplication.theatreId);

                        if (!festival || !theatre) return null;

                        return (
                            <Card key={festivalApplication.id} sx={{ 
                                width: "300px",
                                height: "fit-content",
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
                                    onClick={() => navigate(`/festivals/applications/${festivalApplication.id}`)}
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
                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            {festivalApplication.serialNumber}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "25px",
                                                letterSpacing: 0.3,
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            {festivalApplication.name}
                                        </Typography>


                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            {festivalApplication.storyWriterName}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            Director name: <span style={{ fontWeight: "bold" }}>{festivalApplication.directorName}</span>
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            Length of play: <span style={{ fontWeight: "bold" }}>{festivalApplication.lengthOfPlay}</span>
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            Expected number of actors: <span style={{ fontWeight: "bold" }}>{festivalApplication.numberOfActors}</span>
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            Applying for: <span style={{ fontWeight: "bold" }}>{festival.name}</span>
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            Applier: <span style={{ fontWeight: "bold" }}>{theatre.name}</span>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default observer(FestivalApplications);