import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../lib/redux/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
