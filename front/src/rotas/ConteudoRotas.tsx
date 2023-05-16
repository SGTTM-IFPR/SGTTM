import { Route, Routes } from "react-router-dom";
import { HomePage } from "../paginas/home.page";
import { UsuarioListPage } from "../paginas/usuario/UsuarioListPage";
import { TorneioListPage } from "../paginas/torneio/TorneioListPage";
import { AppSidebar } from "../paginas/AppSidebar";
import { MainLayout } from "../layouts/PrincipalLayout";
import { TorneioPage } from "../paginas/torneio/TorneioPage";
import { RankingPage } from "../paginas/ranking/RankingPage";

export const ConteudoRotas = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="/home" element={<HomePage />} />
        <Route path="/user" element={<UsuarioListPage />} />
        <Route path="/tournament" element={<TorneioListPage />} />
        <Route path="/torneio/:id" element={<TorneioPage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Route>
    </Routes>
  );
};
