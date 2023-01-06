import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


export type CartItem = {
  id: string;
  imageUrl: string;
  count: number;
  title: string;
  price: number;
  size: number;
  type: string;
}

interface BasketSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: BasketSliceState = {
  totalPrice: 0,
  items: [],
};

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
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
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

export const selectBasket = (state: RootState) => state.basket
export const selectBasketItemById = (id: string) => (state: RootState) => state.basket.items.find((item) => item.id === id)
export const selectBasketItems = (state: RootState) => state.basket.items
// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem } = basketSlice.actions;

export default basketSlice.reducer;
