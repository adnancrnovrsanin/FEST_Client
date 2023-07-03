export interface Theatre {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    yearOfCreation: number;
    managerEmail: string;
}

export interface CreateTheatreDto {
    name: string;
    address: string;
    phoneNumber: string;
    yearOfCreation: number;
    managerEmail: string | null;
}

export interface EditTheatreDto {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    yearOfCreation: number;
    managerEmail: string;
}