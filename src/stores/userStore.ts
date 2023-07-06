import { makeAutoObservable, runInAction } from "mobx";
import { Role, User } from "../common/interfaces/UserInterfaces";
import agent from "../api/agent";
import { AuthUserDto, LoginRequestDto, RegisterRequestDto } from "../common/interfaces/AuthInterfaces";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
    user: User | null = null;
    loading = false;
    refreshTokenTimeout: any;

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
                id: response.id,
                name: response.name,
                surname: response.surname,
                email: response.email,
                role: response.role
            }
            store.commonStore.setToken(response.token);
            runInAction(() => {
                this.startRefreshTokenTimer({...user, token: response.token });
                this.user = user;
                this.getUser();
                router.navigate("/");
            });
        } catch (error) {
            console.log(error);
        }
    };

    // register = async (user: RegisterRequestDto) => {
    //     try {
    //         const response = await agent.AccountRequests.register(user);
    //         store.commonStore.setToken(response.token);
    //         const newUser: User = {
    //             name: response.name,
    //             surname: response.surname,
    //             email: response.email,
    //             role: response.role
    //         }
    //         runInAction(() => {
    //             this.user = newUser;
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
    }

    getUser = async () => {
        try {
            const response = await agent.AccountRequests.current();
            store.commonStore.setToken(response.token);
            const user: User = {
                id: response.id,
                name: response.name,
                surname: response.surname,
                email: response.email,
                role: response.role
            }
            runInAction(() => {
                this.startRefreshTokenTimer({...response, token: response.token });
                this.user = user;
            });
        } catch (error) {
            console.log(error);
        }
    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.AccountRequests.refreshToken();
            runInAction(() => {
                this.user = user;
            });
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer = (user: AuthUserDto) => {
        const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (30 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer = () => {
        clearTimeout(this.refreshTokenTimeout);
    };
}