import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomePage } from "../paginas/home.page";
import { PrivateRoutes } from "./PrivateRoutes";
import { ConteudoRotas } from "./ConteudoRotas";
import { LoginPagina } from "../paginas/login/LoginPagina";
import { PublicRoutes } from "./PublicRoutes";
import { AuthenticationProvider } from "../autenticacao/context/AuthenticationProvider";

export const AppRoute = () => {
  return (
    <Router>
      <AuthenticationProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <LoginPagina />
              </PublicRoutes>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoutes>
                <ConteudoRotas />
              </PrivateRoutes>
            }
          />
        </Routes>
      </AuthenticationProvider>
    </Router>
  );
};