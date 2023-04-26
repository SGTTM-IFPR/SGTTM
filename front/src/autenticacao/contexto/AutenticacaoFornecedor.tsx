import { ReactNode, useCallback, useEffect, useState } from "react";
import { AutenticacaoContexto, AutenticacaoContextoProps } from "./AutenticacaoContexto";

interface AutenticacaoFornecedorProps {
  children: ReactNode;
}

const AUTHED_STORAGE_KEY = "authed";

export const AutenticacaoFornecedor = ({ children }: AutenticacaoFornecedorProps) => {
  const [authed, setAuthed] = useState(() => {
    const storedAuthed = localStorage.getItem(AUTHED_STORAGE_KEY);
    return storedAuthed === "true";
  });

  useEffect(() => {
    localStorage.setItem(AUTHED_STORAGE_KEY, authed.toString());
  }, [authed]);
  
  const login = useCallback<AutenticacaoContextoProps["login"]>(
    (email: string, password: string) => {
      // Implement your login logic here
      setAuthed(true);
    },
    []
  );

  const logout = useCallback<AutenticacaoContextoProps["logout"]>(() => {
    // Implement your logout logic here
    setAuthed(false);
  }, []);

  return (
    <AutenticacaoContexto.Provider value={{ authed, login, logout }}>
      {children}
    </AutenticacaoContexto.Provider>
  );
};
