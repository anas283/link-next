import { ITheme } from "@/app/dashboard/appearance/theme-list";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ILinkState {
  linkDetails: ILinkDetails[],
  selectedTheme: ITheme
}

export interface ILink {
  id: number,
  uid: number,
  title: string,
  url: string,
  mode: string
}

export interface ILinkDetails {
  profileImage: string,
  username: string,
  bio: string,
  links: ILink[]
}

const initialState: ILinkState = {
  linkDetails: [],
  selectedTheme: {
    name: '',
    themeClass: '',
    previewImage: ''
  }
};

export const linkSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLinkDetails: (state, action: PayloadAction<[]>) => {
      state.linkDetails = action.payload
    },
    setTheme: (state, action: PayloadAction<ITheme>) => {
      state.selectedTheme = action.payload
    }
  },
});

export const { setLinkDetails, setTheme } = linkSlice.actions;
export const linkReducer = linkSlice.reducer;