
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";

const SearchBox = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((s) => s.filters.selected.Search) || "";

  return (
    <div>
      <label className="form-label text-uppercase text-muted small mb-1">Search</label>
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Bid No. / Item Name"
        value={value}
        onChange={(e) => dispatch(setFilterField({ field: "Search", value: e.target.value || undefined }))}
      />
    </div>
  );
};

export default SearchBox;