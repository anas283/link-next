import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  authState: boolean;
  userDetails: []
}

const initialState: IAuthState = {
  authState: false,
  userDetails: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<[]>) => {
      state.userDetails = action.payload
    }
  },
});

export const { setAuthState, setUserDetails } = authSlice.actions;
export const authReducer = authSlice.reducer;