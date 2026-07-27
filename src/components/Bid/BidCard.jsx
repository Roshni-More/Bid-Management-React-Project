
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDateTime, getBidStatus, getBidTitle } from "../../utils/formatters";
import BidStatus from "./BidStatus";

const BidCard = ({ bid }) => {
  const navigate = useNavigate();
  return (
    <div className="col-md-6 col-lg-4">
      <div className="bg-white border rounded-3 shadow-sm p-3 h-100">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="text-primary fw-semibold" role="button" onClick={() => navigate(`/details/${bid.bidNumber}`)}>
            {bid.bidNumber}
          </span>
          <BidStatus status={getBidStatus(bid)} />
        </div>
        <div className="fw-semibold mb-1">{getBidTitle(bid)}</div>
        <div className="text-muted small mb-1">{bid.departmentName} · {bid.organisationName}</div>
        <div className="d-flex justify-content-between small mt-2">
          <span>Est. Value: {formatCurrency(bid.estimatedBidValue)}</span>
          <span>Closes: {formatDateTime(bid.bidEndDateTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default BidCard;