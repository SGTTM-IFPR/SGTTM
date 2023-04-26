import { createContext } from 'react'

export interface AutenticacaoContextoProps {
    authed: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

// Provide a default value that matches the AuthContextProps type
const defaultAutenticacaoContexto: AutenticacaoContextoProps = {
    authed: false,
    login: () => {},
    logout: () => {},
};

export const AutenticacaoContexto = createContext( defaultAutenticacaoContexto );