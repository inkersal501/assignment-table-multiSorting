import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import sortReducer from "./sortSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    sort: sortReducer,
  },
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;