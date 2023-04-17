import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../authentication/context/AuthContext";

interface PrivateRoutesProps {
  children: ReactNode;
}

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const { authed } = useContext(AuthContext);

  return (
    <>
      {authed ? children : <Navigate to="login" />}
    </>
  );
};
