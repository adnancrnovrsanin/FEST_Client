import { Role } from "./UserInterfaces";

export interface LoginRequestDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    id: string;
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

export interface AuthUserDto {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: Role;
    token: string;
}