import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CardState {
  selectedIds: number[]; // Состояние для выбранных ID
}

const initialState: CardState = {
  selectedIds: [],
};

const CheckBoxSlice = createSlice({
  name: 'CheckboxSlice',
  initialState,
  reducers: {
    toggleCardId(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(item => item !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    setSelectedIds(state, action: PayloadAction<number[]>) {
      state.selectedIds = action.payload;
    },
  },
});

export const { toggleCardId, setSelectedIds } = CheckBoxSlice.actions;
export default CheckBoxSlice.reducer;
