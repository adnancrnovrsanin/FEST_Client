export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: Role;
}

export enum Role {
    ADMIN = 'ADMIN',
    FESTIVAL_MANAGER = 'FESTIVAL_MANAGER',
    THEATRE_MANAGER = 'THEATRE_MANAGER',
    ACTOR = 'ACTOR',
    REVIEWER = 'REVIEWER'
}