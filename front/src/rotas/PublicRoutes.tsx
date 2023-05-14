import { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AutheticationContext, useAuth } from "../autenticacao/context/AuthenticationContext";

interface PublicRoutesProps {
  children: ReactNode;
}

export const PublicRoutes = ({ children }: PublicRoutesProps) => {
  const { identity } = useAuth();

  return (
    <>
      {identity.isLoggedIn  ? <Navigate to="/home" /> : children }
    </>
  );
};
