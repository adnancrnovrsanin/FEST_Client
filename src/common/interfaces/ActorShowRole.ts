import { User } from "./UserInterfaces";

export interface ActorShowRole{
    id: string,
    showId: string,
    roleId: string,
    showName: string,
    showRoleName: string,
    actor: User | null,
    pay: number,
}