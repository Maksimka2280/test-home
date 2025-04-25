// Cardslice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
const initialState = {
  selectedIds: [] as number[],
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleCardId(state, action: PayloadAction<number>) {
      const id = action.payload;
      // Если id уже есть в массиве, убираем его, иначе добавляем
      if (state.selectedIds.includes(id)) {
        // Убираем id из массива
        state.selectedIds = state.selectedIds.filter(cardId => cardId !== id);
      } else {
        // Добавляем id в массив
        state.selectedIds = [...state.selectedIds, id];
      }
    },
    toggleDelCard(state) {
      state.selectedIds = [];
    },
  },
});

export const { toggleCardId, toggleDelCard } = cardSlice.actions;
export default cardSlice.reducer;
