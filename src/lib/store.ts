import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./store/authSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'state',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
})

// Infer the type of makeStore
// export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']

export const persistor = persistStore(store)

export type AppStore = typeof store;
// export type RootState = ReturnTypestore.getState;
// export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store;