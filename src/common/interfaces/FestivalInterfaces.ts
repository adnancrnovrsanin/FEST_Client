import { Theatre } from "./TheatreInterfaces";

export interface Festival {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    zipCode: number;
    city: string;
    organizer: Theatre | null;
}

export interface FestivalDto {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    zipCode: number;
    city: string;
    organizer: Theatre | null;
}

export interface CreateFestivalDto {
    name: string;
    startDate: string;
    endDate: string;
    zipCode: number;
    city: string;
    organizer: Theatre | null;
}

export interface ShowFestivalApplicationDto {
    festivalId: string;
    serialNumber: number;
    name: string;
    directorName: string;
    storyWriterName: string;
    lengthOfPlay: number;
    numberOfActors: number;
    additionalInformation: string;
}