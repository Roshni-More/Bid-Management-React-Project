
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import BidDetailsPage from "./pages/BidDetailsPage";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          {/* wildcard route — bid numbers contain slashes */}
          <Route path="/details/*" element={<BidDetailsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;