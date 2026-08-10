import { useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { fetchBidList } from "../../api/bidApi";
import { getBidStatus, formatDate } from "../../utils/formatters";

const ExportExcelButton = ({ filters }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    try {
      setExporting(true);

      let allBids = [];
      let pageNumber = 1;

      // First request to know the total number of pages
      const firstResponse = await fetchBidList({
        ...filters,
        PageNumber: 1,
        PageSize: 100,
      });

      allBids = [...(firstResponse.data || [])];

      const totalPages = firstResponse.totalPages || 1;

      // Fetch remaining pages
      for (pageNumber = 2; pageNumber <= totalPages; pageNumber++) {
        const response = await fetchBidList({
          ...filters,
          PageNumber: pageNumber,
          PageSize: 100,
        });

        allBids = [...allBids, ...(response.data || [])];
      }

      if (allBids.length === 0) {
        alert("No bids available to export.");
        return;
      }

      // Convert all bids into Excel rows
      const excelData = allBids.map((bid) => ({
        "Bid Number": bid.bidNumber,

        Department: bid.departmentName,
        Organisation: bid.organisationName,
        Location: bid.officeName,
        Category: bid.categoryKey,
        "Sub Category": bid.categorySubKey,

        "Bid Start Date": formatDate(bid.cardStartDate),
        "Bid End Date": formatDate(bid.cardEndDate),

        Status: getBidStatus(bid),
      }));

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // Create workbook
      const workbook = XLSX.utils.book_new();

      // Add worksheet
      XLSX.utils.book_append_sheet(workbook, worksheet, "Bids");

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Create downloadable file
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "GeM_Bids.xlsx");
    } catch (error) {
      console.error("Excel export failed:", error);
      alert("Failed to export bids to Excel.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-outline-success btn-sm"
      onClick={handleExport}
      disabled={exporting}
      title="Export all bids to Excel"
    >
      <FaFileExcel />

      {exporting && <span className="ms-1">Exporting...</span>}
    </button>
  );
};

export default ExportExcelButton;
