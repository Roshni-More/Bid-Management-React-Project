import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";

const CardEndDate = () => {
  const dispatch = useAppDispatch();

  const value = useAppSelector(
    (state) => state.filters.selected.CardEndDate
  );

  return (
    <div className="filter-item">
      <label>To</label>

      <input
        type="date"
        className="form-control"
        value={value || ""}
        onChange={(e) =>
          dispatch(
            setFilterField({
              field: "CardEndDate",
              value: e.target.value,
            })
          )
        }
      />
    </div>
  );
};

export default CardEndDate;