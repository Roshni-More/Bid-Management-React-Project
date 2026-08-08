import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";

const CardStartDate = () => {
  const dispatch = useAppDispatch();

  const value = useAppSelector(
    (state) => state.filters.selected.CardStartDate
  );

  return (
    <div className="filter-item">
      <label>From</label>

      <input
        type="date"
        className="form-control"
        value={value || ""}
        onChange={(e) =>
          dispatch(
            setFilterField({
              field: "CardStartDate",
              value: e.target.value,
            })
          )
        }
      />
    </div>
  );
};

export default CardStartDate;