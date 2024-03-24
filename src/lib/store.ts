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

// export const store = configureStore({
//   reducer: {
//     auth: persistedReducer,
//     link: linkReducer
//   },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({ serializableCheck: false })
// })

// Infer the type of makeStore
// export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']

// export const persistor = persistStore(store)

export type AppStore = typeof store;
// export type RootState = ReturnTypestore.getState;
// export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store;