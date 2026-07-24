import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUserHandler } from "./lib/redux/authActions";
import Layout from "./components/layout/layout";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getCurrentUserHandler());
  }, []);

  return <Layout />;
};

export default App;
