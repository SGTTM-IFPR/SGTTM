export interface Identity {
    email: string;
    role: string;
    nome: string;
    id: number;
    isAdmin: boolean;
    isLoggedIn: boolean;
    token: string;
}