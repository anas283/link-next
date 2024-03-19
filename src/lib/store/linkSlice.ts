import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ILinkState {
  linkDetails: ILinkDetails[]
}

export interface ILinkDetails {
  profileImage: string,
  username: string,
  bio: string
}

const initialState: ILinkState = {
  linkDetails: []
};

export const linkSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLinkDetails: (state, action: PayloadAction<[]>) => {
      state.linkDetails = action.payload
    }
  },
});

export const { setLinkDetails } = linkSlice.actions;
export const linkReducer = linkSlice.reducer;