import { makeAutoObservable, runInAction } from "mobx";
import { ActorProfile,ReviewerProfile,ManagerProfile} from "../common/interfaces/ProfileInterfaces";
import agent from "../api/agent";
import { ActorShowRole } from "../common/interfaces/ActorShowRole";
import { Audition } from "../common/interfaces/AuditionInterfaces";
import { Photo } from "../common/interfaces/Photo";
import { ActorShowRoleAudition } from "../common/interfaces/ActorShowRoleAudition";


export default class ProfileStore{
    loading = false;
    photos : Photo[] = [];
    auditionsreviewed : ActorShowRoleAudition[] = [];
    auditionsnotreviewed : ActorShowRoleAudition[] = [];
    actingroles: ActorShowRole[] = [];
    actor : ActorProfile | null = null;
    reviewer : ReviewerProfile | null = null;
    manager : ManagerProfile | null = null;
    constructor(){
        makeAutoObservable(this);
    }
    getPhoto = async(id: string) => {
        try {
            this.loading = true;
            const photo = await agent.ProfileRequests.photosDetails(id)
            runInAction(() => {
                this.photos = photo;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    getActingRoles = async(id: string) => {
        try {
            this.loading = true;
            const roles = await agent.ProfileRequests.actingRoleDetails(id)
            runInAction(() => {
                this.actingroles = roles;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });

        }
    }
    getAuditionsReviewed = async(id: string) => {
        try {
            this.loading = true;
            const audtion = await agent.ProfileRequests.auditionsReviewedDetails(id)
            runInAction(() => {
                this.auditionsreviewed = audtion;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    getAuditionsNotReviewed = async(id: string) => {
        try {
            this.loading = true;
            const audtion = await agent.ProfileRequests.auditionsNotReviewedDetails(id)
            runInAction(() => {
                this.auditionsnotreviewed = audtion;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    getActor = async (id : string) =>{
        try {
            this.loading = true;
            const actor = await agent.ProfileRequests.actorDetails(id);
             runInAction(()=>{
                this.actor = actor;
                this.loading = false;
             })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    getReviewer = async (id : string) =>{
        try {
            this.loading = true;
            const reviewer = await agent.ProfileRequests.reviewerDetails(id);
             runInAction(()=>{
                this.reviewer = reviewer;
                this.loading = false;
             })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    getManager = async (id : string) =>{
        try {
            this.loading = true;
            const manager = await agent.ProfileRequests.managerDetails(id);
             runInAction(()=>{
                this.manager = manager;
                this.loading = false;
             })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    updateActor = async (actor : ActorProfile ) =>{
        try {
            this.loading = true;
            await agent.ProfileRequests.updateActor(actor)
            runInAction(()=>{
                this.getActor(actor.id)
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.loading = false;
            });

        }
    }
    updateReviewer = async (reviewer : ReviewerProfile) =>{
        try {
            this.loading = true;
            await agent.ProfileRequests.updateReviewer(reviewer)
            runInAction(()=>{
                this.getReviewer(reviewer.id)
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.loading = false;
            });

        }
    }
    updateManager = async (manager : ManagerProfile ) =>{
        try {
            this.loading = true;
            await agent.ProfileRequests.updateManager(manager)
            runInAction(()=>{
                this.getManager(manager.id)
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.loading = false;
            });

        }
    }
}