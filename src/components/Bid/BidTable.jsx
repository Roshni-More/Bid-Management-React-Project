
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import {
    selectBidList,
    selectBidListLoading,
    selectBidListError,
} from "../../features/bids/bidSelectors";

import { loadBidList } from "../../features/bids/bidThunk";
import { setSort } from "../../features/filters/filterSlice";

import {
    formatDate,
    getBidStatus,
} from "../../utils/formatters";

import Table from "../Common/Table";
import Loader from "../Common/Loader";
import ErrorDisplay from "../Common/ErrorDisplay";
import NoData from "../Common/NoData";

import BidStatus from "./BidStatus";
import BidActions from "./BidActions";

const BidTable = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const items = useAppSelector(selectBidList);
    const loading = useAppSelector(selectBidListLoading);
    const error = useAppSelector(selectBidListError);

    const { SortBy, Descending } = useAppSelector(
        (state) => state.filters.selected
    );

    // Handle sorting
    const handleSortChange = (sortKey) => {
        const descending =
            SortBy === sortKey ? !Descending : false;

        dispatch(
            setSort({
                sortBy: sortKey,
                descending,
            })
        );
    };

    // Retry API call
    const handleRetry = () => {
        dispatch(loadBidList());
    };

    // Table columns
    const columns = [
        {
            header: "Bid Number",
            accessor: (row) => (
                <span
                    className="text-primary fw-semibold"
                    role="button"
                    onClick={() =>
                        navigate(`/details/${row.bidNumber}`)
                    }
                >
                    {row.bidNumber}
                </span>
            ),
        },

        {
            header: "Title",
            accessor: (row) =>
                row.itemName ||
                row.title ||
                row.bidTitle ||
                "-",
        },

        {
            header: "Department",
            accessor: (row) => {
                const value = row.departmentName || "";
                const words = value.trim().split(/\s+/);

                return (
                    <span title={value}>
                        {words.length > 4
                            ? `${words
                                  .slice(0, 4)
                                  .join(" ")}...`
                            : value || "-"}
                    </span>
                );
            },
            sortKey: "Department",
        },

        {
            header: "Organisation",
            accessor: (row) => {
                const value = row.organisationName || "";
                const words = value.trim().split(/\s+/);

                return (
                    <span title={value}>
                        {words.length > 4
                            ? `${words
                                  .slice(0, 4)
                                  .join(" ")}...`
                            : value || "-"}
                    </span>
                );
            },
        },

        {
            header: "Location",
            accessor: (row) => {
                const value = row.officeName || "";
                const words = value.trim().split(/\s+/);

                return (
                    <span title={value}>
                        {words.length > 4
                            ? `${words
                                  .slice(0, 4)
                                  .join(" ")}...`
                            : value || "-"}
                    </span>
                );
            },
        },

        {
            header: "Category",
            accessor: (row) =>
                row.categoryKey ||
                row.itemCategory ||
                "-",
        },

        {
            header: "Sub-Category",
            accessor: (row) =>
                row.categorySubKey || "-",
        },

        {
            header: "Start Date",
            accessor: (row) => (
                <div
                    className="d-flex align-items-center"
                    style={{
                        whiteSpace: "nowrap",
                        gap: "8px",
                    }}
                >
                    <span
                        className="text-success"
                        style={{
                            fontWeight: 600,
                            fontSize: "11px",
                        }}
                    >
                        {row.cardStartDate
                            ? formatDate(row.cardStartDate)
                            : row.bidDate
                            ? formatDate(row.bidDate)
                            : "-"}
                    </span>
                </div>
            ),
            sortKey: "BidDate",
        },

        {
            header: "End Date",
            accessor: (row) => (
                <div
                    className="d-flex align-items-center"
                    style={{
                        whiteSpace: "nowrap",
                        gap: "8px",
                    }}
                >
                    <span
                        className="text-warning"
                        style={{
                            color: "#d39e00",
                            fontWeight: 600,
                            fontSize: "11px",
                        }}
                    >
                        {row.cardEndDate
                            ? formatDate(row.cardEndDate)
                            : "-"}
                    </span>
                </div>
            ),
            sortKey: "BidDate",
        },

        {
            header: "Status",
            accessor: (row) => (
                <BidStatus
                    status={getBidStatus(row)}
                />
            ),
        },

        {
            header: "Actions",
            accessor: (row) => (
                <BidActions bid={row} />
            ),
        },
    ];

    // Loading state
    if (loading) {
        return <Loader />;
    }

    // Error state
    if (error) {
        return (
            <ErrorDisplay
                message={error}
                onRetry={handleRetry}
            />
        );
    }

    // No data
    if (items.length === 0) {
        return <NoData />;
    }

    // Table
    return (
        <Table
            columns={columns}
            data={items}
            rowKey={(row) => row.bidNumber}
            sortBy={SortBy}
            descending={Descending}
            onSortChange={handleSortChange}
        />
    );
};

export default BidTable;

