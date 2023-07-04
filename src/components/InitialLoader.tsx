import { CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

function InitialLoader({ adding }: { adding: string}) {
    return (
        <div className="initialLoader">
            <CircularProgress color='primary'/>
            <Typography sx={{
                fontSize: "20px",
                fontWeight: 400,
                color: "black",
                marginTop: "10px",
                fontFamily: "Poppins, sans-serif"
            }}>Loading {adding}...</Typography>
        </div>
    );
}

export default observer(InitialLoader);