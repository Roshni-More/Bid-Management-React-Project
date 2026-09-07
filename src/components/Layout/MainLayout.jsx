import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const [setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove login token
    localStorage.removeItem("accessToken");

    // Go to login page
    navigate("/login", { replace: true });
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      <Header
        onMenuClick={() => setSidebarOpen(true)}
        onLogout={handleLogout}
      />

      {/* <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      /> */}

      <main className="flex-grow-1 p-3">
        {children}
      </main>

    </div>
  );
};

export default MainLayout;