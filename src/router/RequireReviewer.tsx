import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const RequireAdmin = () => {
    const { userStore: { user } } = useStore();
    const location = useLocation();

    if (user?.role !== "REVIEWER") {
        return <Navigate to='/' state={{from: location}} />
    }

    return <Outlet />;
}

export default observer(RequireAdmin);