import { Role } from "./UserInterfaces";

export interface LoginRequestDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    name: string;
    surname: string;
    email: string;
    role: Role;
    token: string;
}

export interface RegisterRequestDto {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: Role;
}

export interface RegisterResponseDto {
    name: string;
    surname: string;
    email: string;
    role: Role;
    token: string;
}