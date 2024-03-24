import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./store/authSlice";
import { linkReducer } from "./store/linkSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  link: linkReducer
})