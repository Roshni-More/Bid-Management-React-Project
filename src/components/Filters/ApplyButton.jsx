
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { loadBidList } from "../../features/bids/bidThunk";
import { loadDashboardStats } from "../../features/dashboard/dashboardSlice";
import { setPage } from "../../features/filters/filterSlice";

const ApplyButton = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((s) => s.bids.listLoading);

  const handleApply = () => {
    dispatch(setPage(1));
    dispatch(loadBidList());
    dispatch(loadDashboardStats());
  };

  return (
    <button className="btn btn-primary btn-sm px-3" onClick={handleApply} disabled={loading}>
      {loading ? <span className="spinner-border spinner-border-sm" /> : "Apply"}
    </button>
  );
};

export default ApplyButton;