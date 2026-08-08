import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";

const CardEndDate = () => {
  const dispatch = useAppDispatch();

  const value = useAppSelector(
    (state) => state.filters.selected.CardEndDate
  );

  return (
    <div className="filter-item">
 <label
    className="form-label mb-1"
    style={{
        textTransform: "none",
        fontSize: "12px",
        fontWeight: "500"
    }}
>
    To
</label>

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