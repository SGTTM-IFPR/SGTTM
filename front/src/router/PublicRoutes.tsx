import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../authentication/context/AuthContext";

interface PublicRoutesProps {
  children: ReactNode;
}

export const PublicRoutes = ({ children }: PublicRoutesProps) => {
  const { authed } = useContext(AuthContext);

  return (
    <>
      {authed ? <Navigate to="/home" /> : children }
    </>
  );
};
