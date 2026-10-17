import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";

import {
  formatDate,
  getBidStatus,
} from "../../utils/formatters";

import BidStatus from "./BidStatus";
import BidPdfViewerModal from "./BidPdfViewerModal";

const BidCard = ({ bid }) => {
  const navigate = useNavigate();
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Use the SAME status logic as BidTable
  const status = getBidStatus(bid);

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

        {/* =========================
            Bid Number + Status
        ========================== */}
        <div className="d-flex justify-content-between align-items-start">
          
          {/* Bid Number */}
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

          {/* Status */}
          <BidStatus status={status} />

        </div>

        {/* =========================
            Department + Organisation
        ========================== */}
        <div
          className="mt-2 text-muted"
          style={{
            fontSize: "11px",
            fontWeight: "400",
            lineHeight: "1.35",
            minHeight: "30px",
            overflow: "hidden",
          }}
          title={`${bid.departmentName || ""} · ${
            bid.organisationName || ""
          }`}
        >
          {bid.departmentName || "-"} · {bid.organisationName || "-"}
        </div>

        {/* =========================
            Category + Sub Category
        ========================== */}
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
            <span className="text-muted fw-bold">
              Category:
            </span>{" "}

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
            <span className="text-muted fw-bold">
              Sub-Category:
            </span>{" "}

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

        {/* =========================
            Start + End Date
        ========================== */}
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

        {/* Card Actions Footer */}
        <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
          <button
            type="button"
            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 py-1 px-2"
            style={{ fontSize: "11px" }}
            onClick={(e) => {
              e.stopPropagation();
              setShowPdfModal(true);
            }}
            title="View Tender PDF Document"
          >
            <FaFilePdf size={12} />
            <span>View PDF</span>
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 py-1 px-2"
            style={{ fontSize: "11px" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/details/${bid.bidNumber}`);
            }}
            title="View Details"
          >
            <span>Details →</span>
          </button>
        </div>

      </div>

      <BidPdfViewerModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        bidNumber={bid.bidNumber}
        directPdfUrl={bid.pdfUrl}
      />
    </div>
  );
};

export default BidCard;