import { ReactNode, createContext, useCallback, useEffect, useState } from "react";

interface AutenticacaoContextoProps {
  authed: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AutenticacaoFornecedorProps {
  children: ReactNode;
}

const AUTHED_STORAGE_KEY = "authed";

export const AutenticacaoContexto = createContext<AutenticacaoContextoProps>({
  authed: false,
  login: () => { },
  logout: () => { },
});

export const AutenticacaoFornecedor = ({ children }: AutenticacaoFornecedorProps) => {
  const [authed, setAuthed] = useState(() => {
    const storedAuthed = localStorage.getItem(AUTHED_STORAGE_KEY);
    return storedAuthed === "true";
  });

  useEffect(() => {
    localStorage.setItem(AUTHED_STORAGE_KEY, authed.toString());
  }, [authed]);

  const login = useCallback<AutenticacaoContextoProps["login"]>(
    (email: string) => {
      setAuthed(true);
    },
    []
  );

  const logout = useCallback<AutenticacaoContextoProps["logout"]>(() => {
    // Implement your logout logic here
    localStorage.removeItem('token');
    setAuthed(false);
    localStorage.removeItem(AUTHED_STORAGE_KEY);
  }, []);

  return (
    <AutenticacaoContexto.Provider value={{ authed, login, logout }}>
      {children}
    </AutenticacaoContexto.Provider>
  );
};