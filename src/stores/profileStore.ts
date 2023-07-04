import { makeAutoObservable, runInAction } from "mobx";
import { ActorProfile,ReviewerProfile,ManagerProfile} from "../common/interfaces/ProfileInterfaces";
import agent from "../api/agent";
import { ActorShowRole } from "../common/interfaces/ActorShowRole";


export default class ProfileStore{
    loading = false;
    actingroles: ActorShowRole[] = [];
    actor : ActorProfile | null = null;
    reviewer : ReviewerProfile | null = null;
    manager : ManagerProfile | null = null;
    constructor(){
        makeAutoObservable(this);
    }
    getActingRoles = async(id: string) => {
        try {
            this.loading = true;
            const roles = await agent.ProfileRequests.actingroledetails(id)
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
    getActor = async (id : string) =>{
        try {
            this.loading = true;
            const actor = await agent.ProfileRequests.actordetails(id);
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
            const reviewer = await agent.ProfileRequests.reviewerdetails(id);
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
            const manager = await agent.ProfileRequests.managerdetails(id);
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
            await agent.ProfileRequests.updateactor(actor)
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
            await agent.ProfileRequests.updatereviewer(reviewer)
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
            await agent.ProfileRequests.updatemanager(manager)
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