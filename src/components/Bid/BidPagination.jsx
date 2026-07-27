
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectBidPagination } from "../../features/bids/bidSelectors";
import { setPage, setPageSize } from "../../features/filters/filterSlice";
import { loadBidList } from "../../features/bids/bidThunk";
import Pagination from "../Common/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../constants/pagination";

const BidPagination = () => {
  const dispatch = useAppDispatch();
  const { pageNumber, totalPages, totalRecords, pageSize } = useAppSelector(selectBidPagination);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    dispatch(loadBidList());
  };

  const handlePageSizeChange = (size) => {
    dispatch(setPageSize(size));
    dispatch(loadBidList());
  };

  return (
    <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top flex-wrap gap-2">
      <div className="text-muted small">
        Showing {(pageNumber - 1) * pageSize + 1} to {Math.min(pageNumber * pageSize, totalRecords)} of {totalRecords}
      </div>
      <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
      <div className="d-flex align-items-center gap-2">
        <span className="text-muted small">Show</span>
        <select
          className="form-select form-select-sm"
          style={{ width: 70 }}
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BidPagination;