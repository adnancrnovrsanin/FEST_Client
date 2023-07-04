import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { CreateShowFestivalApplicationReviewDto, ShowFestivalApplication } from "../common/interfaces/FestivalInterfaces";

export default class FestivalApplicationStore {
    loading = false;
    festivalApplications: ShowFestivalApplication[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getAllFestivalApplications = async () => {
        this.loading = true;
        try {
            const applications = await agent.FestivalRequests.allApplications();
            store.festivalStore.getFestivals();
            store.theatreStore.getTheatres();
            runInAction(() => {
                this.festivalApplications = applications;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    reviewFestivalApplication = async (applicationId: string, isAcceptable: boolean) => {
        this.loading = true;
        const user = store.userStore.user;
        if (!user) {
            this.loading = false;
            return;
        }
        try {
            const request: CreateShowFestivalApplicationReviewDto = {
                showFestivalApplicationId: applicationId,
                reviewerId: user.id,
                acceptable: isAcceptable
            };
            await agent.ReviewerRequests.reviewShowRequest(request);
            runInAction(() => {
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}