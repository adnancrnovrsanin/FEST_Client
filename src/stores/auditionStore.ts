import { makeAutoObservable, runInAction } from "mobx";
import { Audition } from "../common/interfaces/AuditionInterfaces";
import agent from "../api/agent";

export default class AuditionStore {
    userAuditions: Audition[] = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    createAudition = async (audition: Audition) => {
        try {
            this.loading = true;
            await agent.AuditionRequests.create(audition);
            runInAction(() => {
                this.userAuditions.push(audition);
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}