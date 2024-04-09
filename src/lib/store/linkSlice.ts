import { IBackground } from "@/app/dashboard/appearance/background-list";
import { ITheme } from "@/app/dashboard/appearance/theme-list";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ILinkState {
  linkDetails: ILinkDetails[],
  selectedTheme: ITheme,
  selectedBackground: IBackground,
  backgroundColor: string,
  buttonColor: string,
  gradientDirection: string
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
  },
  backgroundColor: '',
  buttonColor: '',
  gradientDirection: ''
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
    },
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload
    },
    setButtonColor: (state, action: PayloadAction<string>) => {
      state.buttonColor = action.payload
    },
    setGradientDirection: (state, action: PayloadAction<string>) => {
      state.gradientDirection = action.payload
    },
  },
});

export const { 
  setLinkDetails, 
  setTheme, 
  setBackground,
  setBackgroundColor,
  setButtonColor,
  setGradientDirection 
} = linkSlice.actions;
export const linkReducer = linkSlice.reducer;