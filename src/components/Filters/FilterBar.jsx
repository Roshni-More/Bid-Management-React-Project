
import MinistryDropdown from "./MinistryDropdown";
import DepartmentDropdown from "./DepartmentDropdown";
import OrganisationDropdown from "./OrganisationDropdown";
import OfficeDropdown from "./OfficeDropdown";
import CategoryDropdown from "./CategoryDropdown";
import SubCategoryDropdown from "./SubCategoryDropdown";
import SearchBox from "./SearchBox";
import DateFilter from "./DateFilter";
// import PriceFilter from "./PriceFilter";
import EvaluationMethodFilter from "./EvaluationMethodFilter";
import ApplyButton from "./ApplyButton";
import ResetButton from "./ResetButton";
import CardStartDate from "./CardStartDate";
import CardEndDate from "./CardEndDate";
import EstimatedValueFilter from "./EstimatedValueFilter";

const FilterBar = () => {
  return (
    <div className="bg-white border rounded-3 shadow-sm p-3 mb-3">
      <div className="row g-2 align-items-end">
        <div className="col-6 col-md-2"><MinistryDropdown /></div>
        <div className="col-6 col-md-2"><DepartmentDropdown /></div>
        <div className="col-6 col-md-2"><OrganisationDropdown /></div>
        <div className="col-6 col-md-2"><OfficeDropdown /></div>
        <div className="col-6 col-md-2"><CategoryDropdown /></div>
        <div className="col-6 col-md-2"><SubCategoryDropdown /></div>
     <div className="col-6 col-md-2">
    <CardStartDate />
</div>

<div className="col-6 col-md-2">
    <CardEndDate />
</div>
        <div className="col-6 col-md-2"><EvaluationMethodFilter /></div>
        <div className="col-6 col-md-2">
    <EstimatedValueFilter />
</div>
        <div className="col-6 col-md-2"><SearchBox /></div>
        <div className="col-12 d-flex justify-content-end gap-2 mt-2">
          <ResetButton />
          <ApplyButton />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;