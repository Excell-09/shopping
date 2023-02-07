import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = action.payload;
      if (newUser) {
        state.currentUser = {
          displayName: newUser.displayName,
          email: newUser.email,
          photoURL: newUser.photoURL,
        };
        state.token = newUser.accessToken;
      }
      return newUser;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
