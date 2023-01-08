import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { PizzaProps, PizzaSliceState, SearchPizzaParams, Status } from './types';

export const fetchPizzas = createAsyncThunk<PizzaProps[], SearchPizzaParams>(
  'pizzas/fetchPizzas',
  async (params) => {
    const { search, order, category, sortBy, currentPage } = params
    const { data } = await axios.get<PizzaProps[]>(`https://628944e910e93797c1642ad9.mockapi.io/items?${category}&page=${currentPage}&limit=8&sortBy=${sortBy}&order=${order}&${search}`)

    return data
  }
)

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading, success, error 
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaProps[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  }
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading'
  //     state.items = []
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.status = 'success'
  //     state.items = action.payload
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error'
  //     state.items = []
  //   }
  // }
});



// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions;


export default pizzasSlice.reducer;
