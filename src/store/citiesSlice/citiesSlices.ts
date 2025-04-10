import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CitiesState {
  selectedCities: string[];
}

const initialState: CitiesState = {
  selectedCities: [],
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<string>) => {
      if (!state.selectedCities.includes(action.payload)) {
        state.selectedCities.push(action.payload);
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.selectedCities = state.selectedCities.filter(city => city !== action.payload);
    },
    setCities: (state, action: PayloadAction<string[]>) => {
      state.selectedCities = action.payload;
    },
  },
});

export const { addCity, removeCity, setCities } = citiesSlice.actions;

export default citiesSlice.reducer;
