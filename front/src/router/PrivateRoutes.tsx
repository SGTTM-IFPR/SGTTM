import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthProviderContext } from "../authentication/context/AuthProvider";
interface PrivateRoutesProps {
  children: ReactNode;
}

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const { authed } = useContext(AuthProviderContext);

  return (
    <>
      {authed ? children : <Navigate to="login" />}
    </>
  );
};
