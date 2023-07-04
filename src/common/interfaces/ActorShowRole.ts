import { ActorProfile } from "./ProfileInterfaces";
import { User } from "./UserInterfaces";

export interface ActorShowRole{
    actor : User;
    showRoleName : string;
    pay : number;
}