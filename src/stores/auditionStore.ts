import { makeAutoObservable, runInAction } from "mobx";
import { Audition, CreateAuditionDto, CreateAuditionReviewDto } from "../common/interfaces/AuditionInterfaces";
import agent from "../api/agent";
import { firebaseUploadAuditionfromUri } from "../common/util/firebaseFileUpload";
import { store } from "./store";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

export default class AuditionStore {
    auditions: Audition[] = [];
    userAuditions: Audition[] = [];
    tempVideoUri: string | null = null;
    selectedAudition: Audition | null = null;
    loading = false;
    uploadingVideo = false;
    reviewLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setTempVideoUri = (uri: string) => this.tempVideoUri = uri; 

    getAudition = async (id: string) => {
        this.loading = true;
        try {
            const audition = await agent.AuditionRequests.get(id);
            runInAction(() => {
                this.selectedAudition = audition;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    createAudition = async (description: string) => {
        if (this.tempVideoUri === null) return;
        const user = store.userStore.user;
        const selectedShowRole = store.showRoleStore.selectedShowRole;
        if (!user || !selectedShowRole) return;
        this.uploadingVideo = true;
        try {
            const videoUrl = await firebaseUploadAuditionfromUri(this.tempVideoUri);
            if (!videoUrl) throw new Error("Video upload failed");
            const audition: CreateAuditionDto = {
                actorId: user.id,
                description,
                videoUrl,
                showRoleId: selectedShowRole.id
            };
            console.log(audition);
            await agent.AuditionRequests.create(audition);
            runInAction(() => {
                this.uploadingVideo = false;
                toast.success("Audition submitted successfully");
                router.navigate("/");
            });
        } catch (error) {
            runInAction(() => {
                this.uploadingVideo = false;
                throw error;
            });
        }
    };

    getAllAuditions = async () => {
        this.loading = true;
        try {
            const auditions = await agent.AuditionRequests.getAll();
            runInAction(() => {
                this.auditions = auditions;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    reviewAudition = async (review: number | null) => {
        if (!this.selectedAudition) return;
        if (!store.userStore.user) return;
        if (review === null) return;
        this.reviewLoading = true;
        const user = store.userStore.user;
        try {
            const reviewRequest: CreateAuditionReviewDto = {
                auditionId: this.selectedAudition.auditionId,
                reviewerId: user.id,
                review
            };
            await agent.AuditionRequests.reviewRequest(reviewRequest);
            runInAction(() => {
                toast.success("Audition reviewed successfully");
                router.navigate("/");
                this.reviewLoading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.reviewLoading = false;
            });
        }
    }
}