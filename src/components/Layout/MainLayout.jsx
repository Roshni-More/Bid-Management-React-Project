import  { useState } from "react";
import Header from "./Header";
// import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  const [ setSidebarOpen] = useState(false);
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      {/* <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}
      <main className="flex-grow-1 p-3">{children}</main>
    </div>
  );
};

export default MainLayout;