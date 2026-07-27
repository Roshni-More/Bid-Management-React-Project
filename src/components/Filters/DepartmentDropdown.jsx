
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";
import { loadFilterOptions } from "../../features/filters/filterThunk";
import FilterDropdown from "./FilterDropdown";

const DepartmentDropdown = () => {
  const dispatch = useAppDispatch();
  const { options, optionsLoading, selected } = useAppSelector((s) => s.filters);

  const handleChange = (value) => {
    dispatch(setFilterField({ field: "DepartmentName", value }));
    dispatch(loadFilterOptions({ Ministry: selected.Ministry, DepartmentName: value }));
  };

  return (
    <FilterDropdown
      label="Department"
      value={selected.DepartmentName}
      options={options?.departments}
      loading={optionsLoading}
      onChange={handleChange}
    />
  );
};

export default DepartmentDropdown;