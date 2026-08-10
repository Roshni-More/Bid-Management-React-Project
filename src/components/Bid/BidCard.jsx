import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatters";

const BidCard = ({ bid }) => {
  const navigate = useNavigate();

  // Category - maximum 4 words
  const category = bid.categoryKey || "-";
  const categoryWords = category.trim().split(/\s+/);

  const displayCategory =
    categoryWords.length > 4
      ? `${categoryWords.slice(0, 4).join(" ")}...`
      : category;

  // Sub-category - maximum 4 words
  const subCategory = bid.categorySubKey || "-";
  const subCategoryWords = subCategory.trim().split(/\s+/);

  const displaySubCategory =
    subCategoryWords.length > 4
      ? `${subCategoryWords.slice(0, 4).join(" ")}...`
      : subCategory;

  return (
    <div
      className="card h-100"
      style={{
        fontSize: "12px",
        border: "1px solid #dee2e6",
        borderTop: "3px solid #ffc107",
        borderRadius: "8px",
        boxShadow:
          "0 6px 14px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
      }}
    >
      <div className="card-body p-3">
        {/* Bid Number + Status */}
        <div className="d-flex justify-content-between align-items-start">
          <span
            className="text-primary fw-semibold"
            role="button"
            onClick={() => navigate(`/details/${bid.bidNumber}`)}
            style={{
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            {bid.bidNumber}
          </span>

          <span
            className="text-muted text-nowrap ms-2"
            style={{
              fontSize: "10px",
            }}
          >
            <span className="text-danger me-1">●</span>
            Expired
          </span>
        </div>

        {/* Department + Organisation */}
        <div
          className="mt-2 text-muted"
          style={{
            fontSize: "11px",
            fontWeight: "400",
            lineHeight: "1.35",
            minHeight: "30px",
            overflow: "hidden",
          }}
          title={`${bid.departmentName || ""} · ${bid.organisationName || ""}`}
        >
          {bid.departmentName || "-"} · {bid.organisationName || "-"}
        </div>

        {/* Category + Sub Category */}
        <div
          className="d-flex align-items-start mt-2"
          style={{
            fontSize: "10px",
            lineHeight: "1.35",
            width: "100%",
            minWidth: 0,
          }}
        >
          {/* Category - LEFT */}
          <div
            className="text-start"
            style={{
              width: "50%",
              minWidth: 0,
              paddingRight: "8px",
              overflow: "hidden",
            }}
            title={category}
          >
            {/* Bold label */}
            <span className="text-muted fw-bold">Category:</span>{" "}
            {/* Normal value */}
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "inline-block",
                maxWidth: "calc(100% - 50px)",
                verticalAlign: "bottom",
                fontWeight: "400",
              }}
            >
              {displayCategory}
            </span>
          </div>

          {/* Sub Category - RIGHT */}
          <div
            className="text-start"
            style={{
              width: "50%",
              minWidth: 0,
              paddingLeft: "8px",
              overflow: "hidden",
            }}
            title={subCategory}
          >
            {/* Bold label */}
            <span className="text-muted fw-bold">Sub-Category:</span>{" "}
            {/* Normal value */}
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "inline-block",
                maxWidth: "calc(100% - 73px)",
                verticalAlign: "bottom",
                fontWeight: "400",
              }}
            >
              {displaySubCategory}
            </span>
          </div>
        </div>

        {/* Start + End Date */}
        <div
          className="d-flex justify-content-between align-items-center mt-3"
          style={{
            fontSize: "11px",
            fontWeight: "700",
          }}
        >
          {/* Start Date */}
          <span className="text-success text-nowrap fw-bold">
            Start: {formatDate(bid.cardStartDate)}
          </span>

          {/* End Date */}
          <span className="text-warning text-nowrap fw-bold">
            End: {formatDate(bid.cardEndDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BidCard;
