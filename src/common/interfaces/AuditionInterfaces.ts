export interface Audition {
    auditionId: string;
    actorId: string;
    name: string;
    surname: string;
    email: string;
    videoURL: string;
    description: string;
    showRoleId: string;
    roleName: string;
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

export interface CreateAuditionReviewDto {
    auditionId: string;
    reviewerId: string;
    review: number;
}