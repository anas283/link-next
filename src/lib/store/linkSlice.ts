import { IBackground } from "@/app/dashboard/appearance/background-list";
import { ITheme } from "@/app/dashboard/appearance/theme-list";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ILinkState {
  linkDetails: ILinkDetails[],
  selectedTheme: ITheme,
  selectedBackground: IBackground
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
  },
  selectedBackground: {
    name: '',
    bgClass: '',
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
    },
    setBackground: (state, action: PayloadAction<ITheme>) => {
      state.selectedBackground = action.payload
    }
  },
});

export const { setLinkDetails, setTheme, setBackground } = linkSlice.actions;
export const linkReducer = linkSlice.reducer;