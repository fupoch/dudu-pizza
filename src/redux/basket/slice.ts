import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getBasketFromLS } from '../../utils/getBasketFromLS';
import { RootState } from '../store';
import { BasketSliceState, CartItem } from './types';

const initialState: BasketSliceState = getBasketFromLS()

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {

      const currItem = state.items.find(obj => obj.id === action.payload.id)
      if (currItem) {
        currItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        });
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
      const currItem = state.items.find(obj => obj.id === action.payload)

      if (currItem) {
        currItem.count--
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.totalPrice = 0
      state.items = [];
    },
  },
});


// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem } = basketSlice.actions;

export default basketSlice.reducer;
