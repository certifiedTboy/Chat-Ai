import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loginSuccess: false,
  errorMessage: undefined,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authIsLoading: (state) => {
      state.isLoading = true;
      state.loginSuccess = false;
      state.errorMessage = undefined;
      state.currentUser = undefined;
    },
    authSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.loginSuccess = true;
      state.errorMessage = undefined;
      state.currentUser = payload;
    },
    authFailed: (state, { payload }) => {
      state.isLoading = false;
      state.loginSuccess = false;
      state.errorMessage = payload;
      state.currentUser = undefined;
    },

    onGetCurrentUser: (state, { payload }) => {
      state.isLoading = false;
      state.loginSuccess = true;
      state.errorMessage = undefined;
      state.currentUser = payload;
    },
    onLogoutUser: (state) => {
      state.isLoading = false;
      state.loginSuccess = false;
      state.errorMessage = undefined;
      state.currentUser = undefined;
    },
  },
});

const { reducer, actions } = authSlice;

export const {
  authIsLoading,
  authSuccess,
  authFailed,
  onGetCurrentUser,
  onLogoutUser,
} = actions;

export default reducer;
