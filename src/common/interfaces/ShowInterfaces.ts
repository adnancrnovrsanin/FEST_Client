export interface Show {
    id: string;
    serialNumber: number;
    name: string;
    additionalInfo: string;
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
}