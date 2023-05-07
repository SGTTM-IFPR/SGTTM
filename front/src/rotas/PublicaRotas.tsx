import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AutenticacaoContexto } from "../autenticacao/contexto/AutenticacaoFornecedor";

interface PublicaRotasProps {
  children: ReactNode;
}

export const PublicaRotas = ({ children }: PublicaRotasProps) => {
  const { authed } = useContext(AutenticacaoContexto);

  return (
    <>
      {authed ? <Navigate to="/home" /> : children }
    </>
  );
};
