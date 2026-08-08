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

    const totalRecords = useAppSelector(
        (state) => state.bids.totalRecords
    );

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

        return [...items].sort((a, b) => {
            return (
                (priority[a.status] ?? 4) -
                (priority[b.status] ?? 4)
            );
        });
    }, [items]);

    return (
        <div>

            <DashboardCards />

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
};

export default DashboardPage;