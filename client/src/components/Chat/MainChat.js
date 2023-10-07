import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Nav, Form } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import useSound from "use-sound";
import EmojiPicker from "./EmojiPicker";
import Message from "./Message";
import sentMessage from "../../Assets/sounds/sentmessage.mp3";
import emojiIcon from "../../Assets/images/emoji.png";
import botImage from "../../Assets/images/bot.png";
import classes from "./Chat.module.css";

const MainChat = (props) => {
  const API_URL = "http://localhost:3001";
  // const API_URL = "http://54.226.85.98:3001";

  const [socketMessage, setSocketMessage] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const focusInput = useRef();
  const params = useParams();
  const [play2] = useSound(sentMessage);

  const { currentUser } = useSelector((state) => state.auth);

  const socket = useRef(io(API_URL));
  let room = localStorage.getItem("l");

  useEffect(() => {
    if (room && room !== params.chatTitle) {
      socket?.current.emit("leaveRoom", {
        userData: {
          username: currentUser.username,
          profileImage: currentUser.picture,
        },
        room,
      });
    }

    setTimeout(() => {
      localStorage.setItem("l", params.chatTitle);
    }, 2000);
  }, [params.chatTitle]);

  useEffect(() => {
    socket?.current.emit("joinRoom", {
      userData: {
        username: currentUser.username,
        profileImage: currentUser.picture,
      },
      room: currentUser.username,
    });

    socket?.current.on("roomUsers", ({ room, users }) => {
      return props.getCurrentRoomUsers(users);
    });

    socket?.current.on("message", (msg) => {
      if (msg.type || msg.type === "new-msg") {
        return setSocketMessage([msg]);
      }

      setSocketMessage((socketMessage) => [...socketMessage, msg]);
    });
  }, [socket, params.chatTitle]);

  // sending chats to socket server function
  const sendMessageHandler = async (event) => {
    event.preventDefault();

    if (!message || message.trim().length === 0) {
      return;
    }

    const data = {
      message,
      user: {
        username: currentUser.username,
        profileImage: currentUser.picture,
      },
    };
    await socket.current.emit("chatMessage", data);
    play2();
    focusInput.current.focus();
    return setMessage(" ");
  };

  const messageChangeHandler = (event) => {
    event.preventDefault();

    setMessage(event.target.value);
  };

  const onEmojiClick = (icon) => {
    setMessage(icon);
  };

  const onShowEmoji = () => {
    if (showEmoji) {
      return setShowEmoji(false);
    }

    return setShowEmoji(true);
  };

  return (
    <div className="mt-5">
      <div>
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Link eventKey="disabled" disabled className={classes.room_link}>
            {params.chatTitle}
          </Nav.Link>
        </Nav>
      </div>

      <div>
        <ScrollToBottom className={classes.chatBoxTop}>
          {socketMessage.map((message) => {
            return (
              <Message
                id={Math.floor(Math.random() * 100000 + "abc")}
                sender={message.sender}
                userImage={message.userImage || botImage}
                message={message.message}
                own={message.sender === currentUser.username}
              />
            );
          })}
        </ScrollToBottom>

        <Form onSubmit={sendMessageHandler}>
          <Form.Group>
            <Form.Control
              value={message}
              className={`${classes.chat_input} d-inline`}
              ref={focusInput}
              onceholder="Share your thought..."
              onChange={messageChangeHandler}
            />

            <img
              src={emojiIcon}
              className={classes.input_img}
              onClick={onShowEmoji}
            />
          </Form.Group>
          <div style={{ display: "absolute" }}>
            {showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MainChat;
