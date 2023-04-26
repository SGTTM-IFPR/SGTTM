import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserPage } from "../pages/user/UserPage";
import { HomePage } from "../pages/home.page";
import { TournamentPage } from "../pages/tournament/TournamentPage";
import { PrivateRoutes } from "./PrivateRoutes";
import { ContentRoutes } from "./ContentRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { LoginPage } from "../pages/login/LoginPage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <ContentRoutes />
            </PrivateRoutes>
          }
        />
      </Routes>
    </Router>
  );
};
