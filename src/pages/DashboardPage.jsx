import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { loadDashboardStats } from "../features/dashboard/dashboardSlice";
import { loadFilterOptions } from "../features/filters/filterThunk";
import { loadBidList } from "../features/bids/bidThunk";

import { selectBidList } from "../features/bids/bidSelectors";

import DashboardCards from "../components/Dashboard/DashboardCards";

// Export to Excel
import ExportExcelButton from "../components/Common/ExportExcelButton";

import FilterBar from "../components/Filters/FilterBar";
import BidTable from "../components/Bid/BidTable";
import BidCard from "../components/Bid/BidCard";
import BidPagination from "../components/Bid/BidPagination";

const DashboardPage = () => {
    const dispatch = useAppDispatch();

    const [view, setView] = useState("table");

    const items = useAppSelector(selectBidList);

<<<<<<< HEAD
    const totalRecords = useAppSelector(
        (state) => state.bids.totalRecords
    );
=======
  const totalRecords = useAppSelector((s) => s.bids.totalRecords);
>>>>>>> ebca5fa44ed4cc24fcafa59f683d2f9f3534bc8a

    const filters = useAppSelector(
        (state) => state.filters.selected
    );

    useEffect(() => {
        dispatch(loadDashboardStats());
        dispatch(loadFilterOptions());
        dispatch(loadBidList());
    }, [filters, dispatch]);

    // Sort bids by status priority
    const sortedItems = useMemo(() => {
        const priority = {
            "Closing Soon": 1,
            Active: 2,
            Expired: 3,
        };

<<<<<<< HEAD
        return [...items].sort((a, b) => {
            return (
                (priority[a.status] ?? 4) -
                (priority[b.status] ?? 4)
            );
        });
    }, [items]);
=======
    return [...items].sort((a, b) => {
      return (priority[a.status] ?? 4) - (priority[b.status] ?? 4);
    });
  }, [items]);
>>>>>>> ebca5fa44ed4cc24fcafa59f683d2f9f3534bc8a

    return (
        <div>

            <DashboardCards />

<<<<<<< HEAD
            <FilterBar />

            <div className="bg-white border rounded-3 shadow-sm">

                {/* All Bids Header */}
                <div className="d-flex justify-content-between align-items-center px-2 py-1 border-bottom">

                    <h6
                        className="mb-0 fw-semibold"
                        style={{
                            color: "#0d6efd",
                            fontSize: "16px",
                        }}
                    >
                        All Bids ({totalRecords})
                    </h6>

                    <div className="d-flex align-items-center gap-2">

                        {/* Table / Cards */}
                        <div className="btn-group btn-group-sm">

                            <button
                                className={`btn ${
                                    view === "table"
                                        ? "btn-primary"
                                        : "btn-outline-secondary"
                                }`}
                                onClick={() =>
                                    setView("table")
                                }
                            >
                                Table
                            </button>

                            <button
                                className={`btn ${
                                    view === "cards"
                                        ? "btn-primary"
                                        : "btn-outline-secondary"
                                }`}
                                onClick={() =>
                                    setView("cards")
                                }
                            >
                                Cards
                            </button>

                        </div>

                        {/* Export Excel */}
                        <ExportExcelButton
                            filters={filters}
                        />

                    </div>
                </div>

                {/* Bid List */}
                {view === "table" ? (
                    <BidTable items={sortedItems} />
                ) : (
                    <div className="row g-3 p-3">

                        {sortedItems.map((bid) => (
                            <BidCard
                                key={bid.bidNumber}
                                bid={bid}
                            />
                        ))}

                    </div>
                )}

                {/* Pagination */}
                <BidPagination />

            </div>

        </div>
    );
=======
      <div className="bg-white border rounded-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">All Bids ({totalRecords})</h5>

          <div className="d-flex gap-2">
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
          <BidTable items={sortedItems} />
        ) : (
          <div className="row g-3 p-3">
            {sortedItems.map((bid) => (
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
>>>>>>> ebca5fa44ed4cc24fcafa59f683d2f9f3534bc8a
};

export default DashboardPage;
