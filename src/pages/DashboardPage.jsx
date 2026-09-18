import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { loadDashboardStats } from "../features/dashboard/dashboardSlice";
import { loadFilterOptions } from "../features/filters/filterThunk";
import { loadBidList } from "../features/bids/bidThunk";
import { setSort, setPage } from "../features/filters/filterSlice";

import { selectBidList } from "../features/bids/bidSelectors";

import DashboardCards from "../components/Dashboard/DashboardCards";

// added for export to excel by Atharv
import ExportExcelButton from "../components/Common/ExportExcelButton";

import FilterBar from "../components/Filters/FilterBar";
import BidTable from "../components/Bid/BidTable";
import BidCard from "../components/Bid/BidCard";
import BidPagination from "../components/Bid/BidPagination";

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  const [view, setView] = useState("table");

  const items = useAppSelector(selectBidList);
  const totalRecords = useAppSelector((s) => s.bids.totalRecords);
  const filters = useAppSelector((s) => s.filters.selected);

  useEffect(() => {
    dispatch(loadDashboardStats());
    dispatch(loadFilterOptions());
    dispatch(loadBidList());
  }, [dispatch]);

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    dispatch(
      setSort({
        sortBy: newSortBy,
        descending: false,
      })
    );
    dispatch(setPage(1));
    dispatch(loadBidList());
  };

  return (
    <>
      <DashboardCards />

      <FilterBar />

      <div className="bg-white border rounded-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom flex-wrap gap-2">
          <h5 className="mb-0">All Bids ({totalRecords})</h5>

          <div className="d-flex align-items-center gap-2">
            {/* Sort Dropdown for newly inserted & updated bids first with status retained */}
            <div className="d-flex align-items-center gap-1">
              <label
                htmlFor="sortBidsSelect"
                className="text-muted small fw-medium text-nowrap mb-0 d-none d-sm-inline"
              >
                Sort by:
              </label>
              <select
                id="sortBidsSelect"
                className="form-select form-select-sm"
                style={{ width: "auto", minWidth: "210px", fontSize: "13px" }}
                value={filters.SortBy || "recentlyupdated"}
                onChange={handleSortChange}
              >
                <option value="recentlyupdated">
                  ⚡ Recently Added / Updated
                </option>
                <option value="status">⏳ Closing Soon First (Default)</option>
                <option value="biddate">📅 Bid Start Date</option>
                <option value="department">🏛️ Department</option>
                <option value="estimatedvalue">💰 Estimated Value</option>
              </select>
            </div>

            <div className="btn-group btn-group-sm">
              <button
                className={`btn ${view === "table" ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setView("table")}
              >
                Table
              </button>

              <button
                className={`btn ${
                  view === "cards" ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => setView("cards")}
              >
                Cards
              </button>
            </div>

            <ExportExcelButton filters={filters} />
          </div>
        </div>

        {view === "table" ? (
          <BidTable />
        ) : (
          <div className="row g-3 p-3">
            {items.map((bid) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={bid.bidNumber}
              >
                <BidCard bid={bid} />
              </div>
            ))}
          </div>
        )}

        <BidPagination />
      </div>
    </>
  );
};

export default DashboardPage;
