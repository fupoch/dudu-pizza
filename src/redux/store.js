import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../redux/slices/filterSlice';
import basketReducer from '../redux/slices/basketSlice';
import pizzasReducer from '../redux/slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    basket: basketReducer,
    pizzas: pizzasReducer
  },
});
