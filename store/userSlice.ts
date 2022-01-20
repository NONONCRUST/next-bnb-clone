import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/user";
import { UserState } from "../types/reduxState";

const initialState: UserState = {
  id: 0,
  email: "",
  lastName: "",
  firstName: "",
  birthday: "",
  isLogged: false,
  profileImage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true };
    },
  },
});

export const userActions = { ...userSlice.actions };

export default userSlice;
