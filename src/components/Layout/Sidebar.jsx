// import React from "react";

const Sidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      />
      <div className="position-fixed top-0 start-0 h-100 bg-white shadow" style={{ width: 240, zIndex: 1050 }}>
        <div className="p-3 border-bottom fw-bold">Menu</div>
        <ul className="list-unstyled p-3">
          <li className="py-2">Dashboard</li>
          <li className="py-2">All Bids</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;