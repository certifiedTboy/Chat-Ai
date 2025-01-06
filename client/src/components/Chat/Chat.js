import React, { useEffect, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams, NavLink } from "react-router-dom";
import { ChatContext } from "../../store/chat-context";
// import { getCurrentUserHandler } from "../../lib/redux/authActions";
import ChatRooms from "./ChatRooms";
import MainChat from "./MainChat";
import EmptyChat from "./EmptyChat";
import classes from "./Chat.module.css";

const Chat = () => {
  const chatCtx = useContext(ChatContext);

  useEffect(() => {
    chatCtx.getRoomUsers();
  }, []);
  // const [roomUsers, setRoomUsers] = useState([]);

  // useEffect(() => {
  //   dispatch(getCurrentUserHandler());
  // }, []);
  const params = useParams();

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col lg={2} md={4} sm={2} xs={2}>
          <ChatRooms />
        </Col>
        <Col lg={8} md={8} sm={10} xs={10}>
          {params.chatTitle && <MainChat />}

          {!params.chatTitle && <EmptyChat />}
        </Col>
        <Col lg={2} className="d-none d-sm-none d-md-none d-lg-block">
          {params.chatTitle && (
            <div className={classes.overflow}>
              {chatCtx?.roomUsers.map((user) => {
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
