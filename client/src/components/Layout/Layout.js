import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import MainNav from "./MainNav/MainNav";
import { SEO } from "../../lib/SEO/SEO";

const Layout = (props) => {
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
    <Fragment>
      <MainNav />
      <main> {props.children} </main>
    </Fragment>
  );
};

export default Layout;
