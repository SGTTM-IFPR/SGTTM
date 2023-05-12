import jwt_decode from 'jwt-decode';

interface DecodedToken {
    email: string;
    role: string;
}
export const VerificarUsuario = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken: DecodedToken = jwt_decode(token);
        if (decodedToken.role === 'admin' || decodedToken.role === 'ADMIN') {
            return true;
        }
        return false;
    }
};