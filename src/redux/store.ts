import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import basketReducer from './slices/basketSlice';
import pizzasReducer from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    basket: basketReducer,
    pizzas: pizzasReducer
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()