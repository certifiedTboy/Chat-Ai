import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUserHandler } from "./lib/redux/authActions";
import Layout from "./components/Layout/Layout";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserHandler());
  }, []);

  return <Layout />;
};

export default App;
