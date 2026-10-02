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
  ConsigneeName: undefined,
  Location: undefined,
  Locations: [],
  CategoryKey: undefined,
  CategorySubKey: undefined,
  Active: true,
  ClosingSoon: undefined,
  Expired: undefined,
  BidDateFrom: undefined,
  BidDateTo: undefined,
  ClosingDateFrom: undefined,
  ClosingDateTo: undefined,
  CardStartDate: undefined,
  CardEndDate: undefined,
  MinEstimatedValue: undefined,
  MaxEstimatedValue: undefined,
  MinEMD: undefined,
  MaxEMD: undefined,
  EvaluationMethod: undefined,
  MSEPurchasePreference: undefined,
  MIIPurchasePreference: undefined,
  SortBy: "recentlyupdated",
  Descending: false,
  PageNumber: DEFAULT_PAGE_NUMBER,
  PageSize: DEFAULT_PAGE_SIZE,
};

const initialState = {
  options: null,
  optionsLoading: false,
  optionsError: null,
  selected: { ...initialSelected },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterField: (state, action) => {
      const { field, value } = action.payload;
      state.selected[field] = value;

      if (field === "Ministry") {
        state.selected.DepartmentName = undefined;
        state.selected.OrganisationName = undefined;
        state.selected.ConsigneeName = undefined;
      }
      if (field === "DepartmentName") {
        state.selected.OrganisationName = undefined;
        state.selected.ConsigneeName = undefined;
      }
      if (field === "OrganisationName") {
        state.selected.ConsigneeName = undefined;
      }
      if (field === "CategoryKey") {
        state.selected.CategorySubKey = undefined;
      }
    },

    toggleLocationFilter: (state, action) => {
      const location = action.payload;
      if (!state.selected.Locations) {
        state.selected.Locations = [];
      }
      const index = state.selected.Locations.indexOf(location);
      if (index > -1) {
        state.selected.Locations.splice(index, 1);
      } else {
        state.selected.Locations.push(location);
      }
      state.selected.PageNumber = DEFAULT_PAGE_NUMBER;
    },

    removeLocationFilter: (state, action) => {
      const location = action.payload;
      if (state.selected.Locations) {
        state.selected.Locations = state.selected.Locations.filter(
          (l) => l !== location
        );
      }
      state.selected.PageNumber = DEFAULT_PAGE_NUMBER;
    },

    clearLocations: (state) => {
      state.selected.Locations = [];
      state.selected.PageNumber = DEFAULT_PAGE_NUMBER;
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
  toggleLocationFilter,
  removeLocationFilter,
  clearLocations,
  setPage,
  setPageSize,
  setSort,
  setStatusFilter,
  syncOptionsFromBidResponse,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;