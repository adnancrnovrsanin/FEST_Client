export interface Audition {
    auditionId: string;
    actorId: string;
    name: string;
    surname: string;
    email: string;
    videoUrl: string;
    description: string;
    showRoleId: string;
    RoleName: string;
    showId: string;
    showName: string;
    averageReview: number;
}

export interface CreateAuditionDto {
    actorId: string;
    videoUrl: string;
    description: string;
    showRoleId: string;
}