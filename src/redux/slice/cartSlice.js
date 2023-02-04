import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartslice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const exitsItem = state.cartItems.find((item) => item.id === newItem.id);

      state.totalQuantity++;

      if (!exitsItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        exitsItem.quantity++;
        exitsItem.totalPrice = Number(exitsItem.totalPrice) + Number(exitsItem.totalPrice);
      }

      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity));
    },
  },
});

export const cartActions = cartslice.actions;

export default cartslice.reducer;
