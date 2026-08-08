import { useNavigate } from "react-router-dom";

import { formatDate } from "../../utils/formatters";

const BidCard = ({ bid }) => {
  const navigate = useNavigate();

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div
        className="card h-100 shadow-sm"
        style={{
          fontSize: "13px",
        }}
      >
        <div className="card-body p-3">
          {/* Bid Number + Status */}
          <div className="d-flex justify-content-between align-items-start gap-2">
            <span
              className="text-primary fw-semibold"
              role="button"
              onClick={() => navigate(`/details/${bid.bidNumber}`)}
              style={{
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {bid.bidNumber}
            </span>

            <span
              className="text-muted text-nowrap"
              style={{ fontSize: "12px" }}
            >
              <span className="text-danger">●</span> Expired
            </span>
          </div>

          {/* Department + Organisation */}
          <div
            className="mt-2 text-muted"
            style={{
              lineHeight: "1.4",
              minHeight: "38px",
            }}
          >
            {bid.departmentName} · {bid.organisationName}
          </div>

          {/* Category */}
          <div
            className="mt-2"
            style={{
              lineHeight: "1.4",
            }}
          >
            <span className="text-muted">Category:</span>{" "}
            {bid.categoryKey || "-"}
            <span className="text-muted ms-2">Sub-Category:</span>{" "}
            {bid.categorySubKey || "-"}
          </div>

          {/* Dates */}
          <div
            className="d-flex align-items-center gap-1 mt-3"
            style={{
              whiteSpace: "nowrap",
              fontSize: "13px",
            }}
          >
            <span className="text-success">
              Start: {formatDate(bid.cardStartDate)}
            </span>

            <span className="text-muted">→</span>

            <span className="text-danger">
              End: {formatDate(bid.cardEndDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidCard;
