import MinistryDropdown from "./MinistryDropdown";
import DepartmentDropdown from "./DepartmentDropdown";
import OrganisationDropdown from "./OrganisationDropdown";
import OfficeDropdown from "./OfficeDropdown";
import CategoryDropdown from "./CategoryDropdown";
import SubCategoryDropdown from "./SubCategoryDropdown";

import SearchBox from "./SearchBox";
// import EvaluationMethodFilter from "./EvaluationMethodFilter";
import ApplyButton from "./ApplyButton";
import ResetButton from "./ResetButton";
import CardStartDate from "./CardStartDate";
import CardEndDate from "./CardEndDate";
// import EstimatedValueFilter from "./EstimatedValueFilter";

const FilterBar = () => {
  return (
    <div className="bg-white border rounded-3 shadow-sm p-2 mb-3">
      {/* FIRST ROW */}
      <div className="row g-2">
        <div className="col-6 col-md-2">
          <MinistryDropdown />
        </div>

        <div className="col-6 col-md-2">
          <DepartmentDropdown />
        </div>

        <div className="col-6 col-md-2">
          <OrganisationDropdown />
        </div>

        <div className="col-6 col-md-2">
          <OfficeDropdown />
        </div>

        <div className="col-6 col-md-2">
          <CategoryDropdown />
        </div>

        <div className="col-6 col-md-2">
          <SubCategoryDropdown />
        </div>
      </div>

      {/* SECOND ROW */}
      <div className="row g-2 align-items-end mt-1">
        {/* FROM */}
        <div className="col-6 col-md-2">
          <CardStartDate />
        </div>

        {/* TO */}
        <div className="col-6 col-md-2">
          <CardEndDate />
        </div>

        {/* EVALUATION METHOD
        <div className="col-6 col-md-2">
          <EvaluationMethodFilter />
        </div> */}

        {/* MIN + MAX */}
        {/* <div className="col-6 col-md-2">
          <EstimatedValueFilter />
        </div> */}

        {/* SEARCH */}
        <div className="col-6 col-md-2">
          <SearchBox />
        </div>

        {/* RESET + APPLY */}
        <div className="col-6 col-md-2 d-flex gap-1">
          <ResetButton />
          <ApplyButton />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
