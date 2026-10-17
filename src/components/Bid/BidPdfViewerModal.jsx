import { useState, useEffect } from "react";
import { FiDownload, FiExternalLink, FiX, FiFileText } from "react-icons/fi";
import { saveAs } from "file-saver";
import { getBidPdfUrl, fetchBidPdfBlob } from "../../api/bidApi";

const BidPdfViewerModal = ({ isOpen, onClose, bidNumber, directPdfUrl }) => {
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    if (!isOpen || !bidNumber) {
      setBlobUrl(null);
      setLoading(true);
      setError(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    // Fetch the PDF as a blob to confirm it loads and avoid iframe auth/error caching issues
    fetchBidPdfBlob(bidNumber)
      .then((blob) => {
        if (!isMounted) return;
        if (blob && blob.size > 0) {
          const url = URL.createObjectURL(blob);
          setBlobUrl(url);
          setLoading(false);
        } else {
          setError("Empty PDF received from tender portal.");
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to load PDF:", err);
        // Fallback to proxy direct streaming URL
        const streamUrl = getBidPdfUrl(bidNumber);
        setBlobUrl(streamUrl);
        setLoading(false);
      });

    return () => {
      isMounted = false;
      if (blobUrl && blobUrl.startsWith("blob:")) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [isOpen, bidNumber]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !bidNumber) return null;

  const streamUrl = getBidPdfUrl(bidNumber);
  const safeFileName = `${bidNumber.replace(/[\/\\]/g, "_")}.pdf`;

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const blob = await fetchBidPdfBlob(bidNumber);
      saveAs(blob, safeFileName);
    } catch (err) {
      console.error("Direct download failed, falling back to window open:", err);
      window.open(getBidPdfUrl(bidNumber, true), "_blank");
    } finally {
      setDownloading(false);
    }
  };

  const handleOpenNewTab = () => {
    window.open(streamUrl, "_blank");
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(4px)",
        zIndex: 1060,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-dialog modal-xl modal-dialog-centered"
        style={{
          maxWidth: "92vw",
          height: "92vh",
          margin: "4vh auto",
        }}
      >
        <div
          className="modal-content shadow-lg border-0 h-100"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            className="modal-header py-2 px-3 text-white"
            style={{
              backgroundColor: "#1e293b",
              borderBottom: "1px solid #334155",
            }}
          >
            <div className="d-flex align-items-center gap-2 overflow-hidden me-3">
              <span
                className="badge bg-danger p-2 d-flex align-items-center justify-content-center"
                style={{ borderRadius: "6px" }}
              >
                <FiFileText size={16} />
              </span>
              <div className="overflow-hidden">
                <h6 className="modal-title mb-0 text-truncate fw-bold text-light" style={{ fontSize: "14px" }}>
                  GeM Tender Document: {bidNumber}
                </h6>
                <small className="text-secondary" style={{ fontSize: "11px" }}>
                  Official Bid Document & Specifications
                </small>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 ms-auto">
              {/* Direct Open in New Tab */}
              <button
                type="button"
                className="btn btn-sm btn-outline-light d-flex align-items-center gap-1"
                onClick={handleOpenNewTab}
                title="Open PDF in new tab"
                style={{ fontSize: "12px", padding: "4px 10px" }}
              >
                <FiExternalLink size={14} />
                <span className="d-none d-sm-inline">New Tab</span>
              </button>

              {/* Download Button */}
              <button
                type="button"
                className="btn btn-sm btn-success d-flex align-items-center gap-1"
                onClick={handleDownload}
                disabled={downloading}
                title="Download PDF to computer"
                style={{ fontSize: "12px", padding: "4px 12px", fontWeight: "500" }}
              >
                <FiDownload size={14} />
                <span>{downloading ? "Downloading..." : "Download"}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary text-white border-0 ms-1 p-1"
                onClick={onClose}
                aria-label="Close"
                title="Close viewer"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div
            className="modal-body p-0 position-relative"
            style={{
              flex: "1 1 auto",
              backgroundColor: "#0f172a",
              minHeight: "400px",
            }}
          >
            {loading && (
              <div
                className="position-absolute top-50 start-50 translate-middle text-center"
                style={{ zIndex: 10 }}
              >
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="text-light mt-3 fw-semibold" style={{ fontSize: "14px" }}>
                  Loading Tender Document...
                </div>
                <div className="text-secondary small mt-1">
                  Connecting to Government e-Marketplace (GeM)
                </div>
              </div>
            )}

            {error ? (
              <div className="position-absolute top-50 start-50 translate-middle text-center p-4 bg-dark rounded border border-secondary text-light" style={{ maxWidth: "480px" }}>
                <div className="text-warning mb-2" style={{ fontSize: "36px" }}>⚠️</div>
                <h5 className="mb-2">Document Unavailable</h5>
                <p className="text-secondary small mb-3">{error}</p>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      setError(null);
                      setLoading(true);
                      setBlobUrl(getBidPdfUrl(bidNumber) + "&t=" + Date.now());
                    }}
                  >
                    Retry Loading
                  </button>
                  {directPdfUrl && (
                    <a
                      href={directPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-info"
                    >
                      Open on GeM Portal
                    </a>
                  )}
                </div>
              </div>
            ) : (
              blobUrl && (
                <iframe
                  src={blobUrl}
                  title={`Bid PDF - ${bidNumber}`}
                  className="w-100 h-100 border-0"
                  style={{ display: "block", minHeight: "100%" }}
                  onLoad={() => setLoading(false)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidPdfViewerModal;
