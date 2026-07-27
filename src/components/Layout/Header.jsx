// import React from "react";
import { FiMenu,  FiDownload } from "react-icons/fi";

const Header = ({ onMenuClick }) => {
  return (
    <header className="d-flex align-items-center justify-content-between bg-white border-bottom px-3 py-2">
      <div className="d-flex align-items-center gap-3">
        <FiMenu size={20} className="text-secondary" role="button" onClick={onMenuClick} />
        <div className="lh-1">
          <div className="fw-bold fs-5">GeM</div>
          <div className="text-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.5px" }}>
            BID MANAGEMENT SYSTEM
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-light"><FiDownload /></button>
        <div className="d-flex align-items-center gap-2 border-start ps-3">
         
        </div>
      </div>
    </header>
  );
};

export default Header;