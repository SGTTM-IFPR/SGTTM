import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../../autenticacao/interfaces/DecodedToken';


export const VerificarNomeUsuario = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken: DecodedToken = jwt_decode(token);
        return decodedToken.nome;
    }
};