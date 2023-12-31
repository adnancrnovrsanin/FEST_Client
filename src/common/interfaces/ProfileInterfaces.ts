import { Theatre } from "./TheatreInterfaces";
import { Role } from "./UserInterfaces";

export interface ActorProfile {
    id: string;
    name: string;
    role :Role;
    surname: string;
    email: string;
}
export interface ReviewerProfile {
    id: string;
    name: string;
    role :Role;
    surname: string;
    email: string;
}
export interface ManagerProfile {
    id: string;
    name: string;
    role :Role;
    surname: string;
    email: string;
    managedTheatre : Theatre;
}