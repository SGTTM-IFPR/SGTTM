import { ReactNode, createContext, useCallback, useEffect, useState } from "react";

const AUTHED_STORAGE_KEY = "authed";

interface AuthContextProps {
  authed: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProviderContext = createContext<AuthContextProps>({
  authed: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authed, setAuthed] = useState(() => {
    const storedAuthed = localStorage.getItem(AUTHED_STORAGE_KEY);
    return storedAuthed === "true";
  });
  
  useEffect(() => {
    localStorage.setItem(AUTHED_STORAGE_KEY, authed.toString());
  }, [authed]);
  
  const login = useCallback<AuthContextProps["login"]>((email, password) => {
    // Implement your login logic here
    setAuthed(true);
  }, []);

  const logout = useCallback<AuthContextProps["logout"]>(() => {
    // Implement your logout logic here
    setAuthed(false);
    sessionStorage.removeItem("token");
  }, []);

  const authProviderValue = { authed, login, logout };

  return (
    <AuthProviderContext.Provider value={authProviderValue}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export { AuthProvider, AuthProviderContext };