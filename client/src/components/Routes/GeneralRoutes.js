import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../../pages/HomePage";
import Register from "../Auths/Register";
import Error404Page from "../../pages/Error404Page";
import { ProtectedRoutes } from "./ProtectedRoutes";
const ChatPage = React.lazy(() => import("../../pages/ChatPage.js"));

const GeneralRoutes = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="*" element={<Error404Page />} />
      <Route
        path="/"
        element={<Navigate to="/get-started/sign-in" replace={true} />}
        exact
      />
      <Route path="/get-started" element={<HomePage />}>
        <Route path="sign-in" element={<Register />} />
      </Route>
      <Route
        path="/chat"
        element={
          <Suspense fallback={<div></div>}>
            <ProtectedRoutes user={currentUser} children={<ChatPage />} />
          </Suspense>
        }
      />
      <Route
        path="/chat/:chatTitle"
        element={
          <Suspense fallback={<div></div>}>
            <ProtectedRoutes user={currentUser} children={<ChatPage />} />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default GeneralRoutes;
