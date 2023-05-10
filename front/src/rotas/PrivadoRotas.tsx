import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AutenticacaoContexto } from "../autenticacao/contexto/AutenticacaoFornecedor";

interface PrivateRoutesProps {
  children: ReactNode;
}

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const { authed } = useContext(AutenticacaoContexto);

  return (
    <>
      {authed ? children : <Navigate to="login" />}
    </>
  );
};
