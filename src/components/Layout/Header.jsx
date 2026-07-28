import { FiMenu, FiDownload, FiSearch } from "react-icons/fi";

const Header = ({ onMenuClick }) => {
  return (
    <header className="d-flex align-items-center justify-content-between bg-white border-bottom px-3 py-2">

      {/* Left */}
      <div className="d-flex align-items-center">

        <FiMenu
          size={20}
          className="text-secondary me-3"
          role="button"
          onClick={onMenuClick}
        />

        <div className="lh-1 me-4">
          <div className="fw-bold fs-5">GeM</div>
          <div
            className="text-muted"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.5px",
            }}
          >
            BID MANAGEMENT SYSTEM
          </div>
        </div>

        {/* Search Bar */}
        <div className="position-relative">
          <FiSearch
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#6c757d",
            }}
          />

          <input
            type="text"
            placeholder="Search Bid No, Ministry, Item..."
            className="form-control ps-5"
            style={{
              width: "380px",
              height: "36px",
              borderRadius: "20px",
            }}
          />
        </div>

      </div>

      {/* Right */}
      <button className="btn btn-light">
        <FiDownload />
      </button>

    </header>
  );
};

export default Header;