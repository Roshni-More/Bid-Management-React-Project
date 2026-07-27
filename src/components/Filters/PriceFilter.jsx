
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";

const PriceFilter = ({ type }) => {
  const dispatch = useAppDispatch();
  const minField = type === "estimatedValue" ? "MinEstimatedValue" : "MinEMD";
  const maxField = type === "estimatedValue" ? "MaxEstimatedValue" : "MaxEMD";
  const label = type === "estimatedValue" ? "Estimated Value" : "EMD";
  const selected = useAppSelector((s) => s.filters.selected);

  const handleChange = (field, e) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    dispatch(setFilterField({ field, value }));
  };

  return (
    <>
      <div>
        <label className="form-label text-uppercase text-muted small mb-1">Min {label}</label>
        <input
          type="number"
          className="form-control form-control-sm"
          value={selected[minField] ?? ""}
          onChange={(e) => handleChange(minField, e)}
        />
      </div>
      <div>
        <label className="form-label text-uppercase text-muted small mb-1">Max {label}</label>
        <input
          type="number"
          className="form-control form-control-sm"
          value={selected[maxField] ?? ""}
          onChange={(e) => handleChange(maxField, e)}
        />
      </div>
    </>
  );
};

export default PriceFilter;