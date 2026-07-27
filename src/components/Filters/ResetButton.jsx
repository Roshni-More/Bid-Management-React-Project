
import { useAppDispatch } from "../../hooks/reduxHooks";
import { resetFilters } from "../../features/filters/filterSlice";
import { loadFilterOptions } from "../../features/filters/filterThunk";
import { loadBidList } from "../../features/bids/bidThunk";
import { loadDashboardStats } from "../../features/dashboard/dashboardSlice";

const ResetButton = () => {
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(loadFilterOptions());
    dispatch(loadDashboardStats());
    dispatch(loadBidList());
  };

  return (
    <button className="btn btn-outline-secondary btn-sm px-3" onClick={handleReset}>
      Reset
    </button>
  );
};

export default ResetButton;