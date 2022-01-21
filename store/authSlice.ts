import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { authMode: "signup" | "login" } = {
  authMode: "signup",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthMode(state, action: PayloadAction<"signup" | "login">) {
      state.authMode = action.payload;
    },
  },
});

export const authActions = { ...authSlice.actions };

export default authSlice;
