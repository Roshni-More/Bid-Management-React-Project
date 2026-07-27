
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";
import { loadFilterOptions } from "../../features/filters/filterThunk";
import FilterDropdown from "./FilterDropdown";

const OrganisationDropdown = () => {
  const dispatch = useAppDispatch();
  const { options, optionsLoading, selected } = useAppSelector((s) => s.filters);

  const handleChange = (value) => {
    dispatch(setFilterField({ field: "OrganisationName", value }));
    dispatch(
      loadFilterOptions({
        Ministry: selected.Ministry,
        DepartmentName: selected.DepartmentName,
        OrganisationName: value,
      })
    );
  };

  return (
    <FilterDropdown
      label="Organisation"
      value={selected.OrganisationName}
      options={options?.organisations}
      loading={optionsLoading}
      onChange={handleChange}
    />
  );
};

export default OrganisationDropdown;