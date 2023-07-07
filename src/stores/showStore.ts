import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ShowSchedule, ShowScheduleDto } from "../common/interfaces/ShowInterfaces";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { store } from "./store";

export default class ShowStore {
    unappointedShows: ShowSchedule[] = [];
    theatreShows: ShowSchedule[] = [];
    festivalShows: ShowSchedule[] = [];
    selectedShow: ShowSchedule | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.selectedShow,
            selectedShow => {
                if (selectedShow) {
                    store.showRoleStore.getShowRoles(selectedShow.showId);
                } else {
                    store.showRoleStore.showRoles = [];
                }
            }
        )
    }

    setSelectedShow = (show: ShowSchedule) => {
        if (show) {
            this.selectedShow = show;
        }
    };

    getShow = async (showId: string) => {
        this.loading = true;
        try {
            const show = await agent.ScheduleRequests.get(showId);
            runInAction(() => {
                this.loading = false;
                let timeToPut: Date | null = new Date(show.timeOfPlay);
                if (timeToPut.getFullYear() === 1) timeToPut = null;
                this.selectedShow = {...show, timeOfPlay: timeToPut};
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                toast.error("Problem getting show");
            });
        }
    };

    getAllShows = async () => {
        this.loading = true;
        this.theatreShows = [];
        try {
            const shows = await agent.ScheduleRequests.getAll();
            runInAction(() => {
                
                for (let i = 0; i < shows.length; i++) {
                    const show = shows[i];
                    let timeToPut: Date | null = new Date(show.timeOfPlay);
                    if (timeToPut.getFullYear() === 1) timeToPut = null;
                    this.theatreShows.push({...show, timeOfPlay: timeToPut});
                }
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    };

    getAllFestivalShows = async (festivalId: string) => {
        this.loading = true;
        this.festivalShows = [];
        try {
            const shows = await agent.ScheduleRequests.getAllFestival(festivalId);
            runInAction(() => {
                
                for (let i = 0; i < shows.length; i++) {
                    const show = shows[i];
                    let timeToPut: Date | null = new Date(show.timeOfPlay);
                    if (timeToPut.getFullYear() === 1) timeToPut = null;
                    this.festivalShows.push({...show, timeOfPlay: timeToPut});
                }
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    getAllTheatreUnappointedShows = async (theatreId: string) => {
        this.loading = true;
        this.unappointedShows = [];
        try {
            const shows = await agent.ScheduleRequests.getAllTheatreUnappointed(theatreId);
            runInAction(() => {
                
                for (let i = 0; i < shows.length; i++) {
                    const show = shows[i];
                    let timeToPut: Date | null = new Date(show.timeOfPlay);
                    if (timeToPut.getFullYear() === 1) timeToPut = null;
                    this.unappointedShows.push({...show, timeOfPlay: timeToPut});
                }
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    };

    getAllTheatreShows = async (theatreId: string) => {
        this.loading = true;
        this.theatreShows = [];
        try {
            const shows = await agent.ScheduleRequests.getAllTheatre(theatreId);
            runInAction(() => {
                
                for (let i = 0; i < shows.length; i++) {
                    const show = shows[i];
                    this.theatreShows.push({...show, timeOfPlay: show.timeOfPlay === "1/1/0001 12:00:00 AM" ? null : new Date(show.timeOfPlay)});
                }
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    };

    editSchedule = async (schedule: ShowScheduleDto) => {
        this.loading = true;
        try {
            await agent.ScheduleRequests.editScheduleRequest(schedule);
            runInAction(() => {
                this.getAllTheatreUnappointedShows(schedule.theatreId);
                this.loading = false;
                toast.success("Schedule edited successfully");
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                toast.error("Problem editing schedule");
            });
        }
    }
}