import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { getBidStatus, formatDate } from "../../utils/formatters";
import BidPdfViewerModal from "./BidPdfViewerModal";

const BidActions = ({ bid }) => {
  const navigate = useNavigate();
  const [showPdfModal, setShowPdfModal] = useState(false);

  const downloadExcel = () => {
    const excelData = [
      {
        "Bid Number": bid.bidNumber,
        // "Title": getBidTitle(bid),
        Department: bid.departmentName,
        Organisation: bid.organisationName,
        Location: bid.officeName,
        Category: bid.itemCategory,
        "Bid Date": formatDate(bid.bidDate),
        Status: getBidStatus(bid),
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Bid");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `${bid.bidNumber}.xlsx`);
  };

  return (
    <>
      <div className="d-flex gap-2">
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => setShowPdfModal(true)}
          title="View Tender PDF Document"
        >
          <FaFilePdf />
        </button>

        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() =>
            navigate(`/details/${bid.bidNumber}`, {
              state: {
                bid: bid,
              },
            })
          }
          title="View Details"
        >
          <FiEye />
        </button>

        <button
          className="btn btn-sm btn-outline-success"
          onClick={downloadExcel}
          title="Download Excel"
        >
          <FaFileExcel />
        </button>
      </div>

      <BidPdfViewerModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        bidNumber={bid.bidNumber}
        directPdfUrl={bid.pdfUrl}
      />
    </>
  );
};

export default BidActions;
