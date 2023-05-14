import axios from "axios";
import { useContext } from "react";
import { AutheticationContext } from "../autenticacao/context/AuthenticationContext";

const baseURL = "http://localhost:5000/";

export const AuthService = {
    
    async authToken() {
    const { logout } = useContext(AutheticationContext);
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