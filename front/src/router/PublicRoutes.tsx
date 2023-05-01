import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthProviderContext } from "../authentication/context/AuthProvider";

interface PublicRoutesProps {
  children: ReactNode;
}

export const PublicRoutes = ({ children }: PublicRoutesProps) => {
  const { authed } = useContext(AuthProviderContext);

  return (
    <>
      {authed ? <Navigate to="/home" /> : children }
    </>
  );
};
