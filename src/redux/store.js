import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../redux/slices/filterSlice';
import basketReducer from '../redux/slices/basketSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    basket: basketReducer,
  },
});
