// import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import HomePage from "../../pages/home/home-page";
import Error404Page from "../../pages/Error404Page";
// import { ProtectedRoutes } from "./protected.js";
// const ChatPage = React.lazy(() => import("../../pages/ChatPage"));

const AppRoutes = () => {
  // const { currentUser } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="*" element={<Error404Page />} />
      <Route
        path="/"
        element={<Navigate to="/get-started/sign-in" replace={true} />}
      />
      <Route path="/get-started/sign-in" element={<HomePage />} />

      {/* <Route
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
      /> */}
    </Routes>
  );
};

export default AppRoutes;
