import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter/slice';
import basketReducer from './basket/slice';
import pizzasReducer from './pizza/slice';
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