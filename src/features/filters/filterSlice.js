import { createSlice } from "@reduxjs/toolkit";
import { loadFilterOptions } from "./filterThunk";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "../../constants/pagination";

const initialSelected = {
  Search: undefined,
  Ministry: undefined,
  DepartmentName: undefined,
  OrganisationName: undefined,
  OfficeName: undefined,
  CategoryKey: undefined,
  CategorySubKey: undefined,
  Active: undefined,
  ClosingSoon: undefined,
  Expired: undefined,
  BidDateFrom: undefined,
  BidDateTo: undefined,
  ClosingDateFrom: undefined,
  ClosingDateTo: undefined,
  MinEstimatedValue: undefined,
  MaxEstimatedValue: undefined,
  MinEMD: undefined,
  MaxEMD: undefined,
  EvaluationMethod: undefined,
  MSEPurchasePreference: undefined,
  MIIPurchasePreference: undefined,
  SortBy: "BidEndDateTime",
  Descending: false,
  PageNumber: DEFAULT_PAGE_NUMBER,
  PageSize: DEFAULT_PAGE_SIZE,
};

const initialState = {
  options: null, // FilterDto: { ministries, departments, organisations, offices, categories, status }
  optionsLoading: false,
  optionsError: null,
  selected: { ...initialSelected },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Updates Redux instantly — used for every keystroke/dropdown pick before Apply
    setFilterField: (state, action) => {
      const { field, value } = action.payload;
      state.selected[field] = value;

      // Cascading reset — clearing child selections when a parent changes
      if (field === "Ministry") {
        state.selected.DepartmentName = undefined;
        state.selected.OrganisationName = undefined;
        state.selected.OfficeName = undefined;
      }
      if (field === "DepartmentName") {
        state.selected.OrganisationName = undefined;
        state.selected.OfficeName = undefined;
      }
      if (field === "OrganisationName") {
        state.selected.OfficeName = undefined;
      }
      if (field === "CategoryKey") {
        state.selected.CategorySubKey = undefined;
      }
    },
    setPage: (state, action) => {
      state.selected.PageNumber = action.payload;
    },
    setPageSize: (state, action) => {
      state.selected.PageSize = action.payload;
      state.selected.PageNumber = DEFAULT_PAGE_NUMBER;
    },
    setSort: (state, action) => {
      state.selected.SortBy = action.payload.sortBy;
      state.selected.Descending = action.payload.descending;
    },
    setStatusFilter: (state, action) => {
      state.selected.Active = action.payload.active;
      state.selected.ClosingSoon = action.payload.closingSoon;
      state.selected.Expired = action.payload.expired;
      state.selected.PageNumber = DEFAULT_PAGE_NUMBER;
    },
    // Called whenever /api/GeMBids returns — its embedded `filters` field
    // keeps dropdown counts and status counts in sync with the latest result set.
    syncOptionsFromBidResponse: (state, action) => {
      state.options = action.payload;
    },
    resetFilters: (state) => {
      state.selected = { ...initialSelected };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFilterOptions.pending, (state) => {
        state.optionsLoading = true;
        state.optionsError = null;
      })
      .addCase(loadFilterOptions.fulfilled, (state, action) => {
        state.optionsLoading = false;
        state.options = action.payload;
      })
      .addCase(loadFilterOptions.rejected, (state, action) => {
        state.optionsLoading = false;
        state.optionsError = action.payload;
      });
  },
});

export const {
  setFilterField,
  setPage,
  setPageSize,
  setSort,
  setStatusFilter,
  syncOptionsFromBidResponse,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
