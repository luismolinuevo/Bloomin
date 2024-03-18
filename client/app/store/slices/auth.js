import { createSlice } from "@reduxjs/toolkit";

export const Auth = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: true,
    userData: null,
  },

  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      console.log(action.payload)
    },
  },
});

export const { setIsLoggedIn, setUserData } = Auth.actions;

export default Auth.reducer;
