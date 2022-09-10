import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./app-slice";
import folderReducer from "./folder-slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    folder: folderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
