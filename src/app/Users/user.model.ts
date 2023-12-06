export interface User{
    id: string;
    name: string;
    password: string;
    role: string;
    email: string;
    isVerified: boolean; //Agregar
    imagePath: string;
}