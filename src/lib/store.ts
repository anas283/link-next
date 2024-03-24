import { configureStore } from "@reduxjs/toolkit";
import { createStore } from 'redux';
import { authReducer } from "./store/authSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { linkReducer } from "./store/linkSlice";
import { rootReducer } from "./rootReducer";

const persistConfig = {
  key: 'state',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);


export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store;