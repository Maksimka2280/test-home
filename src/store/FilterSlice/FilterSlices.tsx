'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FiltersState {
  selectedFilters: string[];
}
const loadFilters = (): string[] => {
  if (typeof window !== 'undefined') {
    const savedFilters = localStorage.getItem('selectedFilters');
    return savedFilters ? JSON.parse(savedFilters) : [];
  }
  return []; // если сервер — вернуть пустой массив
};


const initialState: FiltersState = {
  selectedFilters: loadFilters(),
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string>) => {
      if (!state.selectedFilters.includes(action.payload)) {
        state.selectedFilters.push(action.payload);
      }
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.selectedFilters = state.selectedFilters.filter(filter => filter !== action.payload);
    },
    setFilters: (state, action: PayloadAction<string[]>) => {
      state.selectedFilters = action.payload;
      localStorage.setItem('selectedFilters', JSON.stringify(action.payload));
    },
    clearFilters: state => {
      state.selectedFilters = [];
      localStorage.removeItem('selectedFilters');
    },
  },
});

export const { addFilter, removeFilter, setFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
