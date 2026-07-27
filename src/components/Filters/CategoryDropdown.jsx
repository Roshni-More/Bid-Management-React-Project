
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";
import { loadFilterOptions } from "../../features/filters/filterThunk";

const CategoryDropdown = () => {
  const dispatch = useAppDispatch();
  const { options, optionsLoading, selected } = useAppSelector((s) => s.filters);
  const categories = options?.categories || []; // [{ category, count, subCategories: [...] }]

  const handleChange = (value) => {
    dispatch(setFilterField({ field: "CategoryKey", value }));
    dispatch(loadFilterOptions({ CategoryKey: value }));
  };

  return (
    <div>
      <label className="form-label text-uppercase text-muted small mb-1">Category</label>
      <select
        className="form-select form-select-sm"
        value={selected.CategoryKey || ""}
        disabled={optionsLoading}
        onChange={(e) => handleChange(e.target.value || undefined)}
      >
        <option value="">{optionsLoading ? "Loading..." : "All Categories"}</option>
        {categories.map((c) => (
          <option key={c.category} value={c.category}>
            {c.category} ({c.count})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;