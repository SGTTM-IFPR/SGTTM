import { createContext } from 'react'

export interface AuthContextProps {
    authed: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

// Provide a default value that matches the AuthContextProps type
const defaultAuthContext: AuthContextProps = {
    authed: false,
    login: () => {},
    logout: () => {},
};

export const AuthContext = createContext( defaultAuthContext );