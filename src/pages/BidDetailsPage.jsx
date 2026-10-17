import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiFileText, FiDownload, FiExternalLink } from "react-icons/fi";
import { saveAs } from "file-saver";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { loadBidDetail } from "../features/bids/bidThunk";
import { clearSelectedBid } from "../features/bids/bidSlice";
import { getBidPdfUrl, fetchBidPdfBlob } from "../api/bidApi";
import BidPdfViewerModal from "../components/Bid/BidPdfViewerModal";

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

  const [showPdfModal, setShowPdfModal] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    const targetBidNumber = bid?.bidNumber || bidNumber;
    if (!targetBidNumber) return;

    try {
      setDownloadingPdf(true);
      const blob = await fetchBidPdfBlob(targetBidNumber);
      const safeName = `${targetBidNumber.replace(/[\/\\]/g, "_")}.pdf`;
      saveAs(blob, safeName);
    } catch (err) {
      console.error("Direct PDF download failed, using browser download:", err);
      window.open(getBidPdfUrl(targetBidNumber, true), "_blank");
    } finally {
      setDownloadingPdf(false);
    }
  };

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
    value: bid.bidNumber || "-",
  },

  {
    label: "Department",
    value: bid.departmentName || "N/A",
  },

  {
    label: "Organization",
    value: bid.organisationName || "N/A",
  },

   {
    label: "Location",
    value: bid.location && !bid.location.includes("|") && !bid.location.includes("Supplier")
      ? bid.location
      : (bid.officeName && !bid.officeName.includes("|") ? bid.officeName : "-"),
  },
  {
    label: "Category",
    value: bid.categoryKey,
  },
  {
  label: "Item Category",
  value: bid.itemCategory,
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

          {/* ================= PDF ACTIONS ================= */}
          <div className="mt-4 pt-3 border-top">
            <h6 className="fw-bold mb-3 text-dark">Tender Documents</h6>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-primary d-flex align-items-center gap-2"
                onClick={() => setShowPdfModal(true)}
              >
                <FiFileText size={18} />
                <span>View Tender Document (PDF)</span>
              </button>

              <button
                type="button"
                className="btn btn-outline-success d-flex align-items-center gap-2"
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
              >
                <FiDownload size={18} />
                <span>{downloadingPdf ? "Downloading PDF..." : "Download PDF"}</span>
              </button>

              {bid.pdfUrl && (
                <a
                  href={bid.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary d-flex align-items-center gap-2"
                >
                  <FiExternalLink size={16} />
                  <span>GeM Portal Link</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <BidPdfViewerModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        bidNumber={bid.bidNumber || bidNumber}
        directPdfUrl={bid.pdfUrl}
      />
    </div>
  );
};

export default BidDetailsPage;
