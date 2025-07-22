import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  ids: number[];
}

const initialState: FavoritesState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<number>) {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.ids = state.ids.filter(id => id !== action.payload);
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      if (state.ids.includes(action.payload)) {
        state.ids = state.ids.filter(id => id !== action.payload);
      } else {
        state.ids.push(action.payload);
      }
    },
    clearFavorites(state) {
      state.ids = [];
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer; 