import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types/reduxState";

const initialState: CommonState = {
  validateMode: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setValidateMode(state, action: PayloadAction<boolean>) {
      state.validateMode = action.payload;
    },
  },
});

export const commonActions = { ...commonSlice.actions };

export default commonSlice;
