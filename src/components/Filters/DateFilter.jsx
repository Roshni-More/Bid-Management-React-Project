import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";

const DateFilter = ({ type }) => {
  const dispatch = useAppDispatch();

  const fromField = type === "bid" ? "BidDateFrom" : "ClosingDateFrom";
  const toField = type === "bid" ? "BidDateTo" : "ClosingDateTo";

  const selected = useAppSelector((s) => s.filters.selected);

  return (
    <div className="row g-2">
      <div className="col-6">
        <label className="form-label text-muted small">From</label>
        <input
          type="date"
          className="form-control form-control-sm"
          value={selected[fromField] || ""}
          onChange={(e) =>
            dispatch(
              setFilterField({
                field: fromField,
                value: e.target.value || undefined,
              })
            )
          }
        />
      </div>

      <div className="col-6">
        <label className="form-label text-muted small">To</label>
        <input
          type="date"
          className="form-control form-control-sm"
          value={selected[toField] || ""}
          onChange={(e) =>
            dispatch(
              setFilterField({
                field: toField,
                value: e.target.value || undefined,
              })
            )
          }
        />
      </div>
    </div>
  );
};

export default DateFilter;