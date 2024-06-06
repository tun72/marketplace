import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import loaderReducer from "./slices/loaderSlice";

import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import productSlice from "./slices/productSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const combinedReducers = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  product: productSlice,
});

const persist_reducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: {
    reducer: persist_reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});

export default store;
