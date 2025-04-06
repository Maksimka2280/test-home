// store/ViewedCard/ViewedCard.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Тип состояния
interface ViewState {
  viewedCards: Record<string, boolean>; // key: cardId, value: true/false
}

// Начальное состояние
const initialState: ViewState = {
  viewedCards: {}, // Пустой объект для хранения состояния карточек
};

// Создание слайса с редьюсерами
const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    // Действие для пометки карточки как просмотренной
    setViewed: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      state.viewedCards[cardId] = true; // Устанавливаем true для карточки
    },
  },
});

// Экспортируем действие для использования в компоненте
export const { setViewed } = viewSlice.actions;

// Экспортируем редьюсер
export default viewSlice.reducer;
