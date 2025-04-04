import React from "react";
import { useLocation } from "react-router-dom";
import MainNav from "./MainNav/MainNav";
import GeneralRoutes from "../Routes/GeneralRoutes";
import { SEO } from "../../lib/SEO/SEO";

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;

  let titleData;

  if (pathname === "/chat") {
    titleData = {
      title: "T-AI Chat - Chat Rooms",
      metaDescription: "all available chat rooms on T-AI chat",
    };
  } else if (pathname === "/get-started/sign-in") {
    titleData = {
      title: "T-AI Chat - Sign-in",
      metaDescription: "login to T-AI Chat to get started",
    };
  } else if (pathname === `/chat/${pathname.split("/")[2]}`) {
    titleData = {
      title: `T-AI - ${pathname.split("/")[2]}`,
      metaDescription: `${pathname.split("/")[2]}`,
    };
  } else {
    titleData = {
      title: "404 Error - Page not found",
      metaDescription: "Page not found",
    };
  }

  SEO(titleData);

  return (
    <>
      <MainNav />
      <main>
        <GeneralRoutes />
      </main>
    </>
  );
};

export default Layout;
