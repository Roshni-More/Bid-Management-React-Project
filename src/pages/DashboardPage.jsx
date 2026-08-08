import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { loadDashboardStats } from "../features/dashboard/dashboardSlice";
import { loadFilterOptions } from "../features/filters/filterThunk";
import { loadBidList } from "../features/bids/bidThunk";

import { selectBidList } from "../features/bids/bidSelectors";

import DashboardCards from "../components/Dashboard/DashboardCards";
import FilterBar from "../components/Filters/FilterBar";
import BidTable from "../components/Bid/BidTable";
import BidCard from "../components/Bid/BidCard";
import BidPagination from "../components/Bid/BidPagination";

const DashboardPage = () => {

  const dispatch = useAppDispatch();

  const [view, setView] = useState("table");

  const items = useAppSelector(selectBidList);

  const totalRecords = useAppSelector(
    (s) => s.bids.totalRecords
  );

  useEffect(() => {
    dispatch(loadDashboardStats());
    dispatch(loadFilterOptions());
    dispatch(loadBidList());
  }, [dispatch]);

  return (
    <div>

      <DashboardCards />

      <FilterBar />

      <div className="bg-white border rounded-3 shadow-sm">

        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">

          <h5 className="mb-0">
            All Bids ({totalRecords})
          </h5>

          <div className="btn-group btn-group-sm">

            <button
              className={`btn ${
                view === "table"
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setView("table")}
            >
              Table
            </button>

            <button
              className={`btn ${
                view === "cards"
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setView("cards")}
            >
              Cards
            </button>

          </div>

        </div>

        {view === "table" ? (
          <BidTable />
        ) : (
          <div className="row g-3 p-3">
            {items.map((bid) => (
              <BidCard
                key={bid.bidNumber}
                bid={bid}
              />
            ))}
          </div>
        )}

        <BidPagination />

      </div>

    </div>
  );
};

export default DashboardPage;