import { ReactNode, useCallback, useEffect, useState } from "react";
import { AuthContext, AuthContextProps } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AUTHED_STORAGE_KEY = "authed";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authed, setAuthed] = useState(() => {
    const storedAuthed = localStorage.getItem(AUTHED_STORAGE_KEY);
    return storedAuthed === "true";
  });

  useEffect(() => {
    localStorage.setItem(AUTHED_STORAGE_KEY, authed.toString());
  }, [authed]);
  
  const login = useCallback<AuthContextProps["login"]>(
    (email: string, password: string) => {
      // Implement your login logic here
      setAuthed(true);
    },
    []
  );

  const logout = useCallback<AuthContextProps["logout"]>(() => {
    // Implement your logout logic here
    setAuthed(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
