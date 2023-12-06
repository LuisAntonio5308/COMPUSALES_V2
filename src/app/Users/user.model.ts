export interface User{
    id: string;
    name: string;
    password: string;
    role: string;
    email: string;
    isVerified: boolean; //Verrificar que si se ha registrado
    //computadoras: string[]; // Aquí se agrega el nuevo campo de tipo arreglo
    imagePath: string;
}