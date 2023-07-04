import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const RequireAdmin = () => {
    const { userStore: { isAdmin } } = useStore();
    const location = useLocation();

    if (!isAdmin) {
        return <Navigate to='/' state={{from: location}} />
    }

    return <Outlet />;
}

export default observer(RequireAdmin);