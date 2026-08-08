import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  formatCurrency,
  formatDate,
  formatDateTime,
} from "../utils/formatters";

const BidDetailsPage = () => {
  const params = useParams();

  // Route is "/details/*" because bid numbers contain slashes
  // Example: GEM/2024/B/1234567
  const bidNumber = params["*"];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const bid = useAppSelector(selectSelectedBid);
  const loading = useAppSelector(selectBidDetailLoading);
  const error = useAppSelector(selectBidDetailError);

  useEffect(() => {
    if (bidNumber) {
      dispatch(loadBidDetail(bidNumber));
    }

    return () => {
      dispatch(clearSelectedBid());
    };
  }, [bidNumber, dispatch]);

  const handleRetry = () => {
    if (bidNumber) {
      dispatch(loadBidDetail(bidNumber));
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={handleRetry} />;
  }

  if (!bid) {
    return null;
  }

  const rows = [
    ["Category", bid.categoryKey],

    ["Estimated Value", formatCurrency(bid.estimatedBidValue)],

    ["EMD Amount", formatCurrency(bid.emdAmount)],

    ["Bid Date", bid.bidDate ? formatDate(bid.bidDate) : "-"],

    [
      "Closing Date",
      bid.bidEndDateTime ? formatDateTime(bid.bidEndDateTime) : "-",
    ],

    ["Evaluation Method", bid.evaluationMethod],
  ];

  return (
    <div className="container py-4">
      <button
        className="btn btn-sm btn-outline-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="mb-0">Bid Details</h4>
        </div>

        <div className="card-body">
          <div className="row">
            {rows.map(([label, value]) => (
              <div className="col-md-6 mb-3" key={label}>
                <div className="fw-semibold">{label}</div>

                <div>{value || "-"}</div>
              </div>
            ))}
          </div>

          {bid.pdfUrl && (
            <div className="mt-3">
              <a
                href={bid.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View Bid Document
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BidDetailsPage;
