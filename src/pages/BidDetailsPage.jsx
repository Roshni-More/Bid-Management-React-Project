import { useEffect } from "react";
import { useParams, useNavigate,useLocation  } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { loadBidDetail } from "../features/bids/bidThunk";
import { clearSelectedBid } from "../features/bids/bidSlice";

import {
  selectSelectedBid,
  selectBidDetailLoading,
  selectBidDetailError,
} from "../features/bids/bidSelectors";

import Loader from "../components/Common/Loader";
import ErrorDisplay from "../components/Common/ErrorDisplay";
import {
  formatDate,
  formatDateTime,
  getBidStatus,
} from "../utils/formatters";

const BidDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const bidFromTable = location.state?.bid;

  // Bid number contains /
  // Example: GEM/2026/B/7806411
  const bidNumber = params["*"];

  const selectedBid = useAppSelector(selectSelectedBid);

const bid = bidFromTable || selectedBid;
  const loading = useAppSelector(selectBidDetailLoading);
  const error = useAppSelector(selectBidDetailError);

  useEffect(() => {
  if (!bidFromTable && bidNumber) {
    dispatch(loadBidDetail(bidNumber));
  }

  return () => {
    dispatch(clearSelectedBid());
  };
}, [bidNumber, bidFromTable, dispatch]);

  const handleRetry = () => {
    if (bidNumber) {
      dispatch(loadBidDetail(bidNumber));
    }
  };

  // Loading
  if (loading) {
    return <Loader />;
  }

  // Error
  if (error) {
    return <ErrorDisplay message={error} onRetry={handleRetry} />;
  }

  // No bid
  if (!bid) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-warning">Bid details not found.</div>
      </div>
    );
  }

  // =====================================================
  // BID DETAILS
  // =====================================================

  const rows = [
  {
    label: "Bid No",
    value: bid.bidNumber,
  },

  {
    label: "Department",
    value: bid.departmentName,
  },

  {
    label: "Organization",
    value: bid.organisationName,
  },

  {
  label: "Location",
  value: bid.consigneeName,
},
  {
    label: "Category",
    value: bid.categoryKey,
  },

  {
    label: "Subcategory",
    value: bid.categorySubKey,
  },

  {
    label: "Bid Start Date",
    value: bid.cardStartDate
      ? formatDate(bid.cardStartDate)
      : "-",
  },

  {
    label: "Bid End Date",
    value: bid.cardEndDate
      ? formatDate(bid.cardEndDate)
      : "-",
  },

  {
    label: "Status",
    value: getBidStatus(bid),
  },
];

  return (
    <div className="container-fluid py-3">
      {/* ================= BACK BUTTON ================= */}

      <button
        type="button"
        className="btn btn-sm btn-outline-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* ================= DETAILS CARD ================= */}

      <div className="card shadow-sm">
        {/* HEADER */}

        <div className="card-header bg-white">
          <h4 className="mb-0">Bid Details</h4>
        </div>

        {/* BODY */}

        <div className="card-body">
          <div className="row">
            {rows.map((item) => (
              <div className="col-md-6 mb-4" key={item.label}>
                <div className="fw-semibold mb-1">{item.label}</div>

                <div className="text-secondary">{item.value || "-"}</div>
              </div>
            ))}
          </div>

          {/* ================= PDF ================= */}

          {bid.pdfUrl && (
            <div className="mt-2">
              <a
                href={bid.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Download Document
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BidDetailsPage;
