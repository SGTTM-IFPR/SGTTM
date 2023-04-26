import { Route, Routes } from "react-router-dom";
import { HomePage } from "../paginas/home.page";
import { UsuarioPagina } from "../paginas/usuario/UsuarioPagina";
import { TorneioPagina } from "../paginas/torneio/TorneioPagina";
import { AppSidebar } from "../paginas/AppSidebar";
import { MainLayout } from "../layouts/PrincipalLayout";

export const ConteudoRotas = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="/home" element={<HomePage />} />
        <Route path="/user" element={<UsuarioPagina />} />
        <Route path="/tournament" element={<TorneioPagina />} />
      </Route>
    </Routes>
  );
};
