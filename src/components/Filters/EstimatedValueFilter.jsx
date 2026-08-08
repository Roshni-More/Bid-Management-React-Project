import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";

const EstimatedValueFilter = () => {
  const dispatch = useAppDispatch();

  const minValue = useAppSelector(
    (state) => state.filters.selected.MinEstimatedValue
  );

  const maxValue = useAppSelector(
    (state) => state.filters.selected.MaxEstimatedValue
  );

  return (
    <div className="row g-2">
      <div className="col">
        <label className="form-label">Min Estimated Value</label>

        <input
          type="number"
          className="form-control"
          placeholder="Min Value"
          value={minValue || ""}
          onChange={(e) =>
            dispatch(
              setFilterField({
                field: "MinEstimatedValue",
                value: e.target.value,
              })
            )
          }
        />
      </div>

      <div className="col">
        <label className="form-label">Max Estimated Value</label>

        <input
          type="number"
          className="form-control"
          placeholder="Max Value"
          value={maxValue || ""}
          onChange={(e) =>
            dispatch(
              setFilterField({
                field: "MaxEstimatedValue",
                value: e.target.value,
              })
            )
          }
        />
      </div>
    </div>
  );
};

export default EstimatedValueFilter;