import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home.page";
import { UserPage } from "../pages/user/UserPage";
import { TournamentPage } from "../pages/tournament/TournamentPage";
import { AppSidebar } from "../pages/AppSidebar";
import { MainLayout } from "../layouts/MainLayout";

export const ContentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="/home" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/tournament" element={<TournamentPage />} />
      </Route>
    </Routes>
  );
};
