import { createContext } from "react";
import { Identity } from "../interfaces/Identity";
import React from "react";

export interface AutheticationContextProps {
    identity: Identity,
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}


export const AutheticationContext = createContext<AutheticationContextProps>({
    identity: {} as Identity,
    login: () => { return new Promise(() => { }) },
    logout: () => { },
});

export const useAuth = () => {
    const context = React.useContext(AutheticationContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
