import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import MainLayout from "./components/Layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import BidDetailsPage from "./pages/BidDetailsPage";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";

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
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage/>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Bid Details */}
        <Route
          path="/details/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <BidDetailsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;