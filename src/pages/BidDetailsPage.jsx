import  { useEffect } from "react";
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
import { formatCurrency, formatDate, formatDateTime } from "../utils/formatters";

const BidDetailsPage = () => {
  // Route is "/details/*" because bid numbers contain slashes (e.g. GEM/2024/B/1234567)
  const params = useParams();
  const bidNumber = params["*"];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const bid = useAppSelector(selectSelectedBid);
  const loading = useAppSelector(selectBidDetailLoading);
  const error = useAppSelector(selectBidDetailError);

  useEffect(() => {
    if (bidNumber) dispatch(loadBidDetail(bidNumber));
    return () => dispatch(clearSelectedBid());
  }, [bidNumber, dispatch]);

  if (loading) return <Loader label="Loading bid details..." />;
  if (error) return <ErrorDisplay message={error} onRetry={() => bidNumber && dispatch(loadBidDetail(bidNumber))} />;
  if (!bid) return null;

  // Matches your real BidDetailDto fields exactly
  const rows = [
    ["Bid Number", bid.bidNumber],
    ["Ministry", bid.ministry],
    ["Department", bid.departmentName],
    ["Organisation", bid.organisationName],
    ["Office", bid.officeName],
    ["Category", bid.itemCategory],
    ["Estimated Value", formatCurrency(bid.estimatedBidValue)],
    ["EMD Amount", formatCurrency(bid.emdAmount)],
    ["Bid Date", formatDate(bid.bidDate)],
    ["Closing Date", formatDateTime(bid.bidEndDateTime)],
    ["Evaluation Method", bid.evaluationMethod],
  ];

  return (
    <div className="container-fluid">
      <button className="btn btn-sm btn-outline-secondary mb-3" onClick={() => navigate(-1)}>← Back</button>
      <div className="bg-white border rounded-3 shadow-sm p-4">
        <h5 className="mb-4">Bid Details</h5>
        <div className="row g-3">
          {rows.map(([label, value]) => (
            <div className="col-md-6" key={label}>
              <div className="text-muted small text-uppercase">{label}</div>
              <div className="fw-semibold">{value || "-"}</div>
            </div>
          ))}
        </div>
        {bid.pdfUrl && (
          <a href={bid.pdfUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary mt-3">
            View Bid Document
          </a>
        )}
      </div>
    </div>
  );
};

export default BidDetailsPage;