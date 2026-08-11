import { FiMenu, FiDownload, FiSearch, FiLogOut } from "react-icons/fi";
import { useAppDispatch } from "../../hooks/reduxHooks";

import { setFilterField, setPage } from "../../features/filters/filterSlice";
import { loadBidList } from "../../features/bids/bidThunk";

const Header = ({ onMenuClick, onLogout }) => {
  const dispatch = useAppDispatch();

  return (
    <header className="d-flex justify-content-between align-items-center px-3 py-1 bg-white border-bottom">

      {/* =========================
          LEFT
      ========================= */}
      <div className="d-flex align-items-center">

        {/* Menu */}
        <FiMenu
          size={20}
          className="text-secondary me-3"
          role="button"
          onClick={onMenuClick}
          style={{ cursor: "pointer" }}
        />

        {/* Logo / Title */}
        <div className="lh-1 me-4">

          <div className="fw-bold fs-5">
            GeM
          </div>

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

        {/* =========================
            SEARCH BAR
        ========================= */}

        {/* Your search code can remain commented */}

      </div>


      {/* =========================
          RIGHT
      ========================= */}
      <div className="d-flex align-items-center gap-2">

        {/* Download */}
        <button
          className="btn btn-light"
          title="Download"
        >
          <FiDownload />
        </button>

        {/* Logout */}
        <button
          className="btn btn-light text-danger"
          onClick={onLogout}
          title="Logout"
        >
          <FiLogOut />
        </button>

      </div>

    </header>
  );
};

export default Header;