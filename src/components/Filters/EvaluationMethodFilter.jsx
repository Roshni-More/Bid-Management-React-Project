
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";

const EvaluationMethodFilter = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((s) => s.filters.selected.EvaluationMethod);

  return (
    <div>
      <label className="form-label text-uppercase text-muted small mb-1">Evaluation Method</label>
      <select
        className="form-select form-select-sm"
        value={value || ""}
        onChange={(e) =>
          dispatch(setFilterField({ field: "EvaluationMethod", value: e.target.value || undefined }))
        }
      >
        <option value="">All Methods</option>
        <option value="Total Value Wise">Total Value Wise</option>
        <option value="Item Wise">Item Wise</option>
      </select>
    </div>
  );
};

export default EvaluationMethodFilter;