import { makeAutoObservable, runInAction } from "mobx";
import { ActorShowRole } from "../common/interfaces/ActorShowRole";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { CreateShowRoleDto } from "../common/interfaces/ShowRoleInterfaces";
import { router } from "../router/Routes";

export default class ShowRoleStore {
    showRoles: ActorShowRole[] = [];
    selectedShowRole: ActorShowRole | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    getShowRole = async (showRoleId: string) => {
        this.loading = true;
        try {
            const showRole = await agent.ShowRoleRequests.get(showRoleId);
            runInAction(() => {
                this.selectedShowRole = showRole;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    createShowRole = async (showRole: CreateShowRoleDto) => {
        this.loading = true;
        try {
            await agent.ShowRoleRequests.create(showRole);
            runInAction(() => {
                this.loading = false;
                toast.success("Show role created successfully");
                router.navigate(`/shows/${showRole.showId}`);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                toast.error("Problem creating show role");
            });
        }
    };

    getShowRoles = async (showId: string) => {
        this.loading = true;
        try {
            const showRoles = await agent.ShowRoleRequests.getShowRoles(showId);
            runInAction(() => {
                this.showRoles = showRoles;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}