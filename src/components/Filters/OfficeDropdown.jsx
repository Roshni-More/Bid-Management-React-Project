import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";
import FilterDropdown from "./FilterDropdown";

const OfficeDropdown = () => {
  const dispatch = useAppDispatch();

  const { options, optionsLoading, selected } =
    useAppSelector((s) => s.filters);

  return (
    <FilterDropdown
      label="Location"
      value={selected.ConsigneeName}
      options={options?.consignees}
      loading={optionsLoading}
      onChange={(value) =>
        dispatch(
          setFilterField({
            field: "ConsigneeName",
            value,
          })
        )
      }
    />
  );
};

export default OfficeDropdown;