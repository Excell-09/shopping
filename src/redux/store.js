import { configureStore } from '@reduxjs/toolkit';
import cartslice from './slice/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartslice,
  },
});

export default store;
