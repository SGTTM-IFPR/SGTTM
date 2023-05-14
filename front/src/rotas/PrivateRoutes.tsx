import { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AutheticationContext, useAuth } from "../autenticacao/context/AuthenticationContext";

interface PrivateRoutesProps {
  children: ReactNode;
}

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const { identity } = useAuth();
  console.log(identity)
  return (
    <>
      {identity.isLoggedIn ? children : <Navigate to="/login" /> }
    </>
  );
};
