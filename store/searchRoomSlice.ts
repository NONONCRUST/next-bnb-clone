import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchRoomState } from "../types/reduxState";

const initialState: SearchRoomState = {
  location: "",
  latitude: 0,
  longitude: 0,
  checkInDate: null,
  checkOutDate: null,
  adultCount: 1,
  childrenCount: 0,
  infantsCount: 0,
};

const searchRoomSlice = createSlice({
  name: "searchRoom",
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
      return state;
    },
    setStartDate(state, action: PayloadAction<string | null>) {
      state.checkInDate = action.payload;
      return state;
    },
    setEndDate(state, action: PayloadAction<string | null>) {
      state.checkOutDate = action.payload;
      return state;
    },
    setAdultCount(state, action: PayloadAction<number>) {
      state.adultCount = action.payload;
      return state;
    },
    setChildrenCount(state, action: PayloadAction<number>) {
      state.childrenCount = action.payload;
      return state;
    },
    setInfantsCount(state, action: PayloadAction<number>) {
      state.infantsCount = action.payload;
      return state;
    },
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
  },
});

export const searchRoomActions = { ...searchRoomSlice.actions };

export default searchRoomSlice;
