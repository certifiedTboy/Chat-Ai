import React, { useEffect, Fragment } from "react";
import {
  onLoginUser,
  getCurrentUserHandler,
} from "../../lib/redux/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./Auth.module.css";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginSuccess, errorMessage, currentUser } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getCurrentUserHandler());
  }, []);

  const successResponse = (response) => {
    dispatch(onLoginUser(response.credential));
  };

  if (loginSuccess || currentUser) {
    navigate("/chat");
  }

  return (
    <Fragment>
      <div className="mb-5 mt-5">
        <h3 className={classes.header_text}> Sign in</h3>
        <p className={`${classes.text}`}>Sign in with google to get started</p>
      </div>

      {errorMessage && (
        <div class="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div>
        <GoogleLogin onSuccess={successResponse} />
      </div>
    </Fragment>
  );
};

export default Register;
