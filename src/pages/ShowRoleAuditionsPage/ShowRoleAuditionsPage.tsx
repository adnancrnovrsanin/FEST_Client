import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { truncate } from "../../common/util/usefulFunctions";
import './style.css';

const ShowRoleAuditionsPage = () => {
    const navigate = useNavigate();
    const { auditionStore } = useStore();
    const { getAllAuditions, auditions } = auditionStore;

    useEffect(() => {
        getAllAuditions();
    }, [getAllAuditions]);

    return (
        <div className="showRoleAuditionsPage">
            <h1>View shows that are available on all festivals</h1>

            <div className="auditionsContainer">
                {
                    auditions.length > 0 ? (
                        auditions.map(audition => (
                            <Card sx={{ 
                                width: "300px",
                                height: "fit-content",
                                margin: "10px",
                                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                                borderRadius: "10px",
                            }} key={audition.auditionId}>
                                <CardActionArea
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        padding: "10px",
                                    }}
                                    onClick={() => navigate(`/auditions/${audition.auditionId}`)}
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
                                                fontWeight: "bold",
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            {audition.name} {audition.surname}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            Email: {audition.email}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            Auditioning for role: {audition.roleName}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            In show: {audition.showName}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                fontFamily: "Poppins, sans-serif",
                                            }}
                                        >
                                            Description: {truncate(audition.description, 100)}...
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))
                    ) : (
                        <h2>No shows available</h2>
                    )
                }
            </div>
        </div>
    );
}

export default observer(ShowRoleAuditionsPage);