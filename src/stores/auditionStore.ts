import { makeAutoObservable, runInAction } from "mobx";
import { Audition, CreateAuditionDto } from "../common/interfaces/AuditionInterfaces";
import agent from "../api/agent";
import { firebaseUploadAuditionfromUri } from "../common/util/firebaseFileUpload";
import { store } from "./store";

export default class AuditionStore {
    userAuditions: Audition[] = [];
    tempVideoUri: string | null = null;
    loading = false;
    uploadingVideo = false;

    constructor() {
        makeAutoObservable(this);
    }

    setTempVideoUri = (uri: string) => this.tempVideoUri = uri; 

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
            });
        } catch (error) {
            runInAction(() => {
                this.uploadingVideo = false;
                throw error;
            });
        }
    };
}