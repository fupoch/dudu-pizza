import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (params, thunkApi) => {
    const {search, order, category, sortProperty, currentPage} = params
    const { data } = await axios.get(`https://628944e910e93797c1642ad9.mockapi.io/items?${category}&page=${currentPage}&limit=8&sortBy=${sortProperty}&order=${order}&${search}`)
    if (data.length === 0) {
      thunkApi.rejectWithValue('Пицыы пустые')
    }
    return thunkApi.fulfillWithValue(data)
  }
)

const initialState = {
  items: [],
  status: 'loading', // loading, success, error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success'
      state.items = action.payload
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error'
      state.items = []
    }
  }
});

export const selectPizzas = (state) => state.pizzas

// Action creators are generated for each case reducer function
export const {setItems } = pizzasSlice.actions;


export default pizzasSlice.reducer;
