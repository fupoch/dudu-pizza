import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action) {
     
      const currItem = state.items.find( obj => obj.id === action.payload.id)
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
    minusItem(state, action) {
      const currItem = state.items.find( obj => obj.id === action.payload)
      
      if (currItem) {
        currItem.count--
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.totalPrice = 0
      state.items = [];
    },
  },
});

export const selectBasket = (state) => state.basket
export const selectBasketItemById = (id) => (state) => state.basket.items.find((item) => item.id === id) 
export const selectBasketItems = (state) => state.basket.items
// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem} = basketSlice.actions;

export default basketSlice.reducer;
