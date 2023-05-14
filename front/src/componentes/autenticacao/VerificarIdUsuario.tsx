import jwt_decode from 'jwt-decode';

interface DecodedToken {
    email: string;
    role: string;
    nome: string;
    id: number;
}
export const VerificarIdUsuario = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken: DecodedToken = jwt_decode(token);
        return decodedToken.id;
    }
};