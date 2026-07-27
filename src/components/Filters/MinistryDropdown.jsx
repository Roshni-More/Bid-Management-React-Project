
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField, setPage } from "../../features/filters/filterSlice";
import { loadFilterOptions } from "../../features/filters/filterThunk";
import FilterDropdown from "./FilterDropdown";

const MinistryDropdown = () => {
  const dispatch = useAppDispatch();
  const { options, optionsLoading, selected } = useAppSelector((s) => s.filters);

  const handleChange = (value) => {
      dispatch(setFilterField({ field: "Ministry", value }));
       dispatch(setPage(1));
    // Reload dependent dropdowns (Department/Organisation/Office) scoped to the new Ministry
    dispatch(loadFilterOptions({ Ministry: value }));
  };

  return (
    <FilterDropdown
      label="Ministry"
      value={selected.Ministry}
      options={options?.ministries}
      loading={optionsLoading}
      onChange={handleChange}
    />
  );
};

export default MinistryDropdown;