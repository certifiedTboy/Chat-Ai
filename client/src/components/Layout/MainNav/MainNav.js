import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import profileImage from "../../../Assets/images/emmatosin.jpg";
import { useSelector, useDispatch } from "react-redux";
import { logoutUserHandler } from "../../../lib/redux/authActions";
import classes from "./MainNav.module.css";

const MainNav = () => {
  const dispatch = useDispatch();

  const logoutUser = async () => {
    dispatch(logoutUserHandler());
  };
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <Navbar
      expand="lg"
      data-bs-theme="dark"
      className={`fixed-top ${classes.nav_bar}`}
    >
      <Container>
        <Navbar.Brand href="#">T-AI</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>

          {currentUser && (
            <NavLink to="/" className={classes.nav_mag}>
              Home
            </NavLink>
          )}

          {currentUser && (
            <NavLink to="/chat" className={classes.nav_mag}>
              Chat
            </NavLink>
          )}
          {!currentUser && (
            <NavLink to="/get-started/sign-in" className={classes.nav_mag}>
              Get Started
            </NavLink>
          )}

          {currentUser && (
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className={classes.profile_image}
                  src={currentUser ? currentUser.picture : profileImage}
                  alt="profile_image"
                />
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#" onClick={logoutUser}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
