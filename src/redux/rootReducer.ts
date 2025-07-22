import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import favoritesReducer from './favoritesSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  favorites: favoritesReducer,
});

export default rootReducer; 