import { observer } from "mobx-react-lite";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useStore } from "../stores/store";

const RequireActor = () => {
    const { userStore: { user } } = useStore();
    const location = useLocation();

    if (user?.role !== "ACTOR") {
        return <Navigate to='/' state={{from: location}} />
    }

    return <Outlet />;
}

export default observer(RequireActor);