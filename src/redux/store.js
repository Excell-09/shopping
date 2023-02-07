import { configureStore } from '@reduxjs/toolkit';
import cartslice from './slice/cartSlice';
import userSlice from './slice/userSlice';

const store = configureStore({
  reducer: {
    cart: cartslice,
    user:userSlice
  },
});

export default store;
