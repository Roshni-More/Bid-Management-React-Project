import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import BidDetailsPage from "./pages/BidDetailsPage";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* Default → Login */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          }
        />

        {/* Bid Details */}
        <Route
          path="/details/*"
          element={
            <MainLayout>
              <BidDetailsPage />
            </MainLayout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;
