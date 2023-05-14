import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { AutheticationContext, AutheticationContextProps } from "./AuthenticationContext";
import axios from "axios";
import { DecodedToken } from "../interfaces/DecodedToken";
import jwt_decode from 'jwt-decode';
import { Identity } from "../interfaces/Identity";
import { login as loginService } from "../../servicos/LoginService";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../useLocalStorage";

interface AutheticationProviderProps {
  children: ReactNode;
}

const AUTH_TOKEN = "token";

export const AuthenticationProvider = ({ children }: AutheticationProviderProps) => {

  const [identity, setIdentity] = useLocalStorage(AUTH_TOKEN, {} as Identity);
  const navigate = useNavigate();


  const getIdentity = (token: string): Identity => {
    try {
      if (!token)
        return {} as Identity;
      const decodedToken: DecodedToken = jwt_decode(token);
      console.log(decodedToken)
      console.log(token)
      return {
        isLoggedIn: true,
        id: decodedToken.id,
        nome: decodedToken.nome,
        email: decodedToken.email,
        role: decodedToken.role,
        token: token,
        isAdmin: (decodedToken.role === 'admin' || decodedToken.role === 'ADMIN')
      };
    } catch (error) {
        console.log(error)
      return {} as Identity;
    }
   
  };

  const login = useCallback<AutheticationContextProps["login"]>(
    async (email: string, password: string) => {
      try {
        const response = await loginService(email, password);
        if (response.status === 200) {
          const identityJwt = getIdentity(response.data.token);
          console.log(identityJwt)
          setIdentity(identityJwt);
          console.log(identity)
        }
        navigate('/home');
        return true;
      } catch (error) {
        console.error(error)
        return false;
      }
    },
    []
  );

  const logout = useCallback<AutheticationContextProps["logout"]>(() => {
    setIdentity(  {} as Identity);
    navigate('/login');
  }, []);

  const value = useMemo(
    () => ({
      identity,
      login,
      logout
    }),
    [identity]
  );
  return (
    <AutheticationContext.Provider value={value}>
      {children}
    </AutheticationContext.Provider>
  );
};

