import { makeAutoObservable, runInAction } from "mobx";
import { Role, User } from "../common/interfaces/UserInterfaces";
import agent from "../api/agent";
import { LoginRequestDto, RegisterRequestDto } from "../common/interfaces/AuthInterfaces";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
    user: User | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    get isAdmin() {
        if (this.user) {
            return this.user.role === Role.ADMIN;
        }
        return false;
    }

    login = async (email: string, password: string) => {
        try {
            const loginRequest: LoginRequestDto = {
                email,
                password
            };
            const response = await agent.AccountRequests.login(loginRequest);
            const user: User = {
                name: response.name,
                surname: response.surname,
                email: response.email,
                role: response.role
            }
            store.commonStore.setToken(response.token);
            runInAction(() => {
                this.user = user;
                this.getUser();
                router.navigate("/");
            });
        } catch (error) {
            console.log(error);
        }
    };

    register = async (user: RegisterRequestDto) => {
        try {
            const response = await agent.AccountRequests.register(user);
            store.commonStore.setToken(response.token);
            const newUser: User = {
                name: response.name,
                surname: response.surname,
                email: response.email,
                role: response.role
            }
            runInAction(() => {
                this.user = newUser;
            });
        } catch (error) {
            console.log(error);
        }
    };

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
    }

    getUser = async () => {
        try {
            const user = await agent.AccountRequests.current();
            runInAction(() => {
                this.user = user;
            });
        } catch (error) {
            console.log(error);
        }
    }
}