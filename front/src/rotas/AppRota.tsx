import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UsuarioPagina } from "../paginas/usuario/UsuarioPagina";
import { HomePage } from "../paginas/home.page";
import { TorneioPagina } from "../paginas/torneio/TorneioPagina";
import { PrivateRoutes } from "./PrivadoRotas";
import { ConteudoRotas } from "./ConteudoRotas";
import { PublicaRotas } from "./PublicaRotas";
import { LoginPagina } from "../paginas/login/LoginPagina";

export const AppRota = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicaRotas>
              <LoginPagina />
            </PublicaRotas>
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
    </Router>
  );
};
