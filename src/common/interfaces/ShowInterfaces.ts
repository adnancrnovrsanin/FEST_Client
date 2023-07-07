export interface Show {
    id: string;
    serialNumber: number;
    name: string;
    additionalInformation: string;
}

export interface ShowScheduleDto {
    id: string;
    timeOfPlay: string;
    lengthOfPlay: number;
    festivalId: string;
    festivalName: string;
    theatreId: string;
    theatreName: string;
    showId: string;
    showName: string;
    showAdditionalInformation: string;
    numberOfActors: number;
    managerEmail: string;
}

export interface ShowSchedule {
    id: string;
    timeOfPlay: Date | null;
    lengthOfPlay: number;
    festivalId: string;
    festivalName: string;
    theatreId: string;
    theatreName: string;
    showId: string;
    showName: string;
    showAdditionalInformation: string;
    numberOfActors: number;
    managerEmail: string;
}