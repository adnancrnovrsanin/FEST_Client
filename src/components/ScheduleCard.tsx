import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { ShowSchedule } from "../common/interfaces/ShowInterfaces";

interface Props {
    show: ShowSchedule;
    onClick?: () => void;
    key?: string;
}

const ScheduleCard = ({ show, onClick }: Props) => {
    return (
        <Card sx={{ 
            width: "300px",
            height: "250px",
            margin: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            borderRadius: "10px",
        }} key={show.id}>
            <CardActionArea
                sx={{
                    height: "100%",
                    width: "100%",
                    padding: "10px",
                }}
                onClick={onClick}
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
                            fontStyle: "Poppins, sans-serif",
                        }}
                    >
                        Show name: <span style={{ fontWeight: "bold" }}>{show.showName}</span>
                    </Typography>

                    <Typography
                        sx={{
                            fontStyle: "Poppins, sans-serif",
                        }}
                    >
                        Festival name: <span style={{ fontWeight: "bold" }}>{show.festivalName}</span>
                    </Typography>

                    <Typography
                        sx={{
                            fontStyle: "Poppins, sans-serif",
                        }}
                    >
                        Theatre name: <span style={{ fontWeight: "bold" }}>{show.theatreName}</span>
                    </Typography>

                    <Typography
                        sx={{
                            fontStyle: "Poppins, sans-serif",
                        }}
                    >
                        Length of play: <span style={{ fontWeight: "bold" }}>{show.lengthOfPlay}</span>
                    </Typography>

                    {
                        show.timeOfPlay !== null && (
                            <Typography
                                sx={{
                                    fontStyle: "Poppins, sans-serif",
                                }}
                            >
                                Date and time of performance: <span style={{ fontWeight: "bold" }}>{moment(show.timeOfPlay).format("DD/MM/YYYY HH:mm")}</span>
                            </Typography>
                        )
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default observer(ScheduleCard);