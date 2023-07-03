import { makeAutoObservable, runInAction } from "mobx";
import { CreateTheatreDto, EditTheatreDto, Theatre } from "../common/interfaces/TheatreInterfaces";
import agent from "../api/agent";

export default class TheatreStore {
    theatres: Theatre[] = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    getTheatres = async () => {
        try {
            this.loading = true;
            const theatres = await agent.TheatreRequests.all();
            runInAction(() => {
                this.theatres = theatres;
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;  
            });
        }
    }

    createTheatre = async (theatre: CreateTheatreDto) => {
        try {
            this.loading = true;
            await agent.TheatreRequests.create(theatre);
            runInAction(() => {
                this.getTheatres();
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.loading = false;
            });
        }
    };

    updateTheatre = async (theatre: EditTheatreDto) => {
        try {
            this.loading = true;
            await agent.TheatreRequests.update(theatre);
            runInAction(() => {
                this.getTheatres();
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.loading = false;
            });
        }
    };

    deleteTheatre = async (id: string) => {
        try {
            this.loading = true;
            await agent.TheatreRequests.delete(id);
            runInAction(() => {
                this.theatres = this.theatres.filter(theatre => theatre.id !== id);
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.loading = false;
            });
        }
    };
}