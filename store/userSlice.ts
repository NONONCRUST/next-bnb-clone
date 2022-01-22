import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/user";
import { UserState } from "../types/reduxState";

const initialState: UserState = {
  id: 0,
  email: "",
  lastName: "",
  firstName: "",
  birthday: "",
  isLogged: true,
  profileImage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogged(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true };
    },
    initUser(state) {
      state = initialState;
      return state;
    },
  },
});

export const userActions = { ...userSlice.actions };

export default userSlice;
