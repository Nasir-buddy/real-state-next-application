import { createSlice } from "@reduxjs/toolkit";
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

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const {} = globalSlice.actions;

export default globalSlice.reducer;
