import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";

const SearchBox = () => {
  const dispatch = useAppDispatch();

  const value = useAppSelector((s) => s.filters.selected.Search) || "";

  return (
    <div className="w-100">
      <label
        className="form-label mb-1"
        style={{
          textTransform: "none",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        Search
      </label>

      <div className="position-relative">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Search"
          value={value}
          onChange={(e) =>
            dispatch(
              setFilterField({
                field: "Search",
                value: e.target.value || undefined,
              }),
            )
          }
          style={{
            height: "40px",
            fontSize: "14px",
            paddingLeft: "12px",
            paddingRight: "12px",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBox;
