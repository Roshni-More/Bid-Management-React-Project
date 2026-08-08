import { FiMenu, FiDownload, FiSearch } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import {
  setFilterField,
  setPage,
} from "../../features/filters/filterSlice";

import { loadBidList } from "../../features/bids/bidThunk";

const Header = ({ onMenuClick }) => {

  const dispatch = useAppDispatch();

  // Get current search value from Redux
  const search = useAppSelector(
    (state) => state.filters.selected.Search
  );

  const handleSearchChange = (e) => {

    const value = e.target.value;

    dispatch(
      setFilterField({
        field: "Search",
        value: value || undefined,
      })
    );
  };

  const handleSearch = () => {

    // Search start from first page
    dispatch(setPage(1));

    // Call API
    dispatch(loadBidList());
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="d-flex justify-content-between align-items-center px-3 py-2 bg-white border-bottom">

      {/* Left */}
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

        {/* Search Bar */}
        <div
          className="position-relative"
          style={{ width: "380px" }}
        >

          {/* Search Icon */}
          <FiSearch
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#6c757d",
              zIndex: 2,
            }}
          />

          {/* Input */}
          <input
            type="text"
            placeholder="Search Bid No, Ministry, Item..."
            className="form-control ps-5"
            value={search || ""}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              height: "36px",
              borderRadius: "20px",
            }}
          />

        </div>

        {/* Search Button */}
        <button
          className="btn btn-primary btn-sm ms-2"
          onClick={handleSearch}
          style={{
            height: "36px",
            borderRadius: "18px",
          }}
        >
          Search
        </button>

      </div>

      {/* Right */}
      <button className="btn btn-light">
        <FiDownload />
      </button>

    </header>
  );
};

export default Header;