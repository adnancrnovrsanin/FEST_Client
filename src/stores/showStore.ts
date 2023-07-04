import { makeAutoObservable, runInAction } from "mobx";
import { ShowSchedule, ShowScheduleDto } from "../common/interfaces/ShowInterfaces";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class ShowStore {
    unappointedShows: ShowSchedule[] = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    getAllTheatreUnappointedShows = async (theatreId: string) => {
        this.loading = true;
        this.unappointedShows = [];
        try {
            const shows = await agent.ScheduleRequests.getAllUnappointed(theatreId);
            runInAction(() => {
                
                for (let i = 0; i < shows.length; i++) {
                    const show = shows[i];
                    this.unappointedShows.push({...show, timeOfPlay: show.timeOfPlay === "1/1/0001 12:00:00 AM" ? null : new Date(show.timeOfPlay)});
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