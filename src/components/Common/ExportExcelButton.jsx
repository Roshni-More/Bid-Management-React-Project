import { useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { saveAs } from "file-saver";

import { exportBids } from "../../api/bidApi";

const ExportExcelButton = ({ filters }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    try {
      setExporting(true);

            // console.log("Export filters:", filters);

            const response = await exportBids(filters);

            const blob = new Blob(
                [response.data],
                {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                }
            );

            saveAs(blob, "GeM_Bids.xlsx");

        } catch (error) {
            console.error("Excel export failed:", error);

            if (error.response?.status === 401) {
                alert("Your session has expired. Please login again.");
            } else {
                alert("Failed to export bids to Excel.");
            }

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
            title="Export filtered bids to Excel"
        >
            <FaFileExcel />

            <span className="ms-1">
                {exporting ? "Exporting..." : "Export Excel"}
            </span>
        </button>
    );
};

export default ExportExcelButton;
