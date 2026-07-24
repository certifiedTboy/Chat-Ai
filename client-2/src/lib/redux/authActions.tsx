import {
  authIsLoading,
  authFailed,
  authSuccess,
  onGetCurrentUser,
  onLogoutUser,
} from "./authSlice";
import { userLogin, getCurrentUser, logoutUser } from "../APIs/authApi";

export const onLoginUser = (token) => async (dispatch) => {
  dispatch(authIsLoading());
  const response = await userLogin(token);

  if (response.error) {
    return dispatch(authFailed(response.error));
  }

  return dispatch(authSuccess(response.authenticatedUser));
};

export const getCurrentUserHandler = () => async (dispatch) => {
  const response = await getCurrentUser();

  if (response.error) {
    return dispatch(authFailed(response.error));
  }

  return dispatch(onGetCurrentUser(response.currentSession));
};

export const logoutUserHandler = () => async (dispatch) => {
  const response = await logoutUser();

  if (response.error) {
    return dispatch(authFailed(response.error));
  }

  return dispatch(onLogoutUser());
};
