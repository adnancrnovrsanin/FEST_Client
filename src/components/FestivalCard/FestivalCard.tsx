import { observer } from "mobx-react-lite";
import { Festival } from "../../common/interfaces/FestivalInterfaces";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
    festival: Festival;
    key?: string;
}

const FestivalCard = ({ festival }: Props) => {
    const navigate = useNavigate();

    return (
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
                onClick={() => navigate(`/festivals/${festival.id}`)}
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
                            fontSize: "20px",
                            fontWeight: "500",
                            fontFamily: "Poppins, sans-serif",
                            color: "#000",
                        }}
                    >
                        {festival.name}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                            fontFamily: "Poppins, sans-serif",
                            color: "#000",
                        }}
                    >
                        {festival.startDate.toLocaleDateString()} - {festival.endDate.toLocaleDateString()}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                            fontFamily: "Poppins, sans-serif",
                            color: "#000",
                        }}
                    >
                        {festival.city}, {festival.zipCode}
                    </Typography>

                    {
                        festival.organizer && (
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                    fontFamily: "Poppins, sans-serif",
                                    color: "#000",
                                }}
                            >
                                Festival organizer: {festival.organizer.name}
                            </Typography>
                        )
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default observer(FestivalCard);