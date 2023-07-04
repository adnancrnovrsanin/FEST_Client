import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Login } from "../../components/Login/Login";
import './style.css';

const LoginPage = () => {

    return (
        <div className="loginContainer">
            <Login />
        </div>
    )
};

export default observer(LoginPage);