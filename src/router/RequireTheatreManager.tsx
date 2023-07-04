import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const RequireTheatreManager = () => {
    const { userStore: { user } } = useStore();
    const location = useLocation();

    if (user?.role !== "THEATRE_MANAGER") {
        return <Navigate to='/' state={{from: location}} />
    }

    return <Outlet />;
}

export default observer(RequireTheatreManager);