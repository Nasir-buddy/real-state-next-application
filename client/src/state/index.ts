import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface FiltersState {
  location: string;
  baths: string;
  propertyType: string;
  amenities: string[];
  availableFrom: string;
  priceRange: [number, number] | [null, null];
  squareFeet: [number, number] | [null, null];
  coordinates: [number, number];
}
interface InitialStateType {
  filters: FiltersState;
  isFilterFullOpen: boolean;
  viewMode: "grid" | "list";
}

export const initialState: InitialStateType = {
  filters: {
    location: "Greater Noida",
    baths: "any",
    propertyType: "any",
    amenities: [],
    availableFrom: "any",
    priceRange: [null, null],
    squareFeet: [null, null],
    coordinates: [28.464464, 77.487364],
  },
  isFilterFullOpen: false,
  viewMode: "grid"
};

// Create a slice of the Redux state called 'globalSlice'
export const globalSlice = createSlice({
  // Name the slice 'global'
  name: "global",
  // Set the initial state for this slice
  initialState,
  // Define the reducers to handle actions and update the state
  reducers: {
    // Define a reducer function 'setFilters' to update the filters in the state
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      // Update the filters in the state by merging the current filters with the new ones from the action payload
      state.filters = { ...state.filters, ...action.payload };
    }
  },
});

export const {} = globalSlice.actions;

export default globalSlice.reducer;
