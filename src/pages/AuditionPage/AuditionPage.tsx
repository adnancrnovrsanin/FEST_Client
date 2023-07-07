import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import InitialLoader from "../../components/InitialLoader";
import './style.css';
import { Rating, Typography } from "@mui/material";
import ReactPlayer from "react-player";

const AuditionPage = () => {
    const { id } = useParams<{ id: string }>();
    const { auditionStore } = useStore();
    const { getAudition, selectedAudition, loading, reviewAudition, reviewLoading } = auditionStore;
    const [tempRating, setTempRating] = useState<number | null>(null);

    useEffect(() => {
        if (id) getAudition(id);
    }, [id, getAudition]);

    if (loading) return (
        <InitialLoader adding="audition" />
    );

    if (!selectedAudition) return (
        <div className="auditionPageContainer">
            <Typography>
                Audition not found.
            </Typography>
        </div>
    );

    return (
        <div className="auditionPageContainer">
            <Typography
                sx={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    fontFamily: 'Poppins, sans-serif'
                }}
            >
                {selectedAudition.name} {selectedAudition.surname}
            </Typography>

            <Typography
                sx={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    fontFamily: 'Poppins, sans-serif',
                    color: '#666',
                }}
            >
                {selectedAudition.email}
            </Typography>

            <Typography
                sx={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                I want to take part in a role of <b>{selectedAudition.roleName}</b> in <b>"{selectedAudition.showName}"</b> show. 
            </Typography>

            <ReactPlayer 
                url={selectedAudition.videoURL}
                controls
                width="100%"
                height="100%"
            />

            <Typography
                sx={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    fontFamily: 'Poppins, sans-serif',
                    marginTop: '1rem',
                }}
            >
                {selectedAudition.description}
            </Typography>

            <Typography
                sx={{
                    fontSize: '1.5rem',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                Ocenite ovu audiciju:
            </Typography>

            <Rating
                name="simple-controlled"
                value={tempRating}
                size="large"
                sx={{
                    fontSize: '2rem',
                    "& .MuiRating-iconFilled": {
                        color: '#f50057',
                        fontSize: '2.5rem',
                    },
                    "& .MuiRating-iconHover": {
                        color: '#f50057',
                        fontSize: '2.5rem',
                    },
                    "& .MuiRating-iconEmpty": {
                        color: '#f50057',
                        fontSize: '2.5rem',
                    },
                    marginInline: 'auto',
                }}
                onChange={(_event, newValue) => {
                    setTempRating(newValue);
                    console.log(newValue);
                }}
            />

            <button 
                className="btn btn-dark mt-3" 
                disabled={reviewLoading || tempRating == null}
                onClick={() => reviewAudition(tempRating)}
            >
                {
                    reviewLoading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        <span>Submit your review</span>
                    )
                }
          </button>
        </div>
    )
}

export default observer(AuditionPage);