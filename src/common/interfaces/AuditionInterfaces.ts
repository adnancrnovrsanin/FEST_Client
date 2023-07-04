export interface Audition {
    id: string;
    videoUrl: string;
    description: string;
}

export interface CreateAuditionDto {
    videoUrl: string;
    description: string;
}