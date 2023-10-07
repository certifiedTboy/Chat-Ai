import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getCurrentUserHandler } from "../../lib/redux/authActions";
import ChatRooms from "./ChatRooms";
import MainChat from "./MainChat";
import EmptyChat from "./EmptyChat";
import classes from "./Chat.module.css";

const Chat = () => {
  const [roomUsers, setRoomUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserHandler());
  }, []);
  const params = useParams();

  const getCurrentRoomUsers = (users = []) => {
    const unique = users.filter((obj, index) => {
      return (
        index ===
        users.findIndex((o) => obj.userData.username === o.userData.username)
      );
    });

    return setRoomUsers(unique);
  };

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col lg={2} md={4} sm={2} xs={2}>
          <ChatRooms />
        </Col>
        <Col lg={8} md={8} sm={10} xs={10} className="mr-5">
          {params.chatTitle && (
            <MainChat getCurrentRoomUsers={getCurrentRoomUsers} />
          )}

          {!params.chatTitle && <EmptyChat />}
        </Col>
        <Col lg={2} className="d-none d-sm-none d-md-none d-lg-block">
          {params.chatTitle && (
            <div className={classes.overflow}>
              {roomUsers.map((user) => {
                return (
                  <div className="mb-3">
                    <img
                      className={classes.room_image}
                      src={user.userData.profileImage}
                      alt="room_image"
                    />
                    <NavLink
                      className={classes.room_link}
                      to={`/chat/${user.userData.username}`}
                    >
                      {" "}
                      {user.userData.username}
                    </NavLink>
                  </div>
                );
              })}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
