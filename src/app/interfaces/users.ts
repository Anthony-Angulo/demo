export interface User {
    id: string;
    userNamen: string;
    Name: string;
    LastName: string;
    email: string;
    active: boolean;
    password: string;
    Roles: [string];
    img: string;
}

export interface Users{
    id: string;
    userNamen: string;
    Name: string;
    LastName: string;
    email: string;
    active: boolean;
    password: string;
    Roles: [string];
    img: string;
} [];

export interface UserImage {
    id: string;
    imgbase64: string;
}

