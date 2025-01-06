import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import GeneralRoutes from "./components/Routes/GeneralRoutes";
import { getCurrentUserHandler } from "./lib/redux/authActions";
import Layout from "./components/Layout/Layout";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserHandler());
  }, []);
  return (
    <Layout>
      <GeneralRoutes />
    </Layout>
  );
};

export default App;
