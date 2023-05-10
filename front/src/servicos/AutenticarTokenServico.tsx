import axios from "axios";
import { AutenticacaoContexto } from '../autenticacao/contexto/AutenticacaoFornecedor';
import { useContext } from "react";

const baseURL = "http://localhost:5000/";

export const AuthService = {
    
    async authToken() {
    const { logout } = useContext(AutenticacaoContexto);
    const token = localStorage.getItem("token");
    const endpoint = "autenticacao/token";
    let response;
    const body = {
      token
    };

    try {
        response = await axios.post(`${baseURL}${endpoint}`, body);   
    } catch (error) {
        logout();
    }

    return response;
  },
};