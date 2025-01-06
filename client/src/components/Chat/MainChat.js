import React, { useRef, useEffect, useState, useContext } from "react";
import { Nav, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChatContext } from "../../store/chat-context";
import ScrollToBottom from "react-scroll-to-bottom";
import EmojiPicker from "./EmojiPicker";
import Message from "./Message";
import emojiIcon from "../../Assets/images/emoji.png";
import botImage from "../../Assets/images/bot.png";
import classes from "./Chat.module.css";

const MainChat = (props) => {
  const [message, setMessage] = useState("");
  const focusInput = useRef();
  const params = useParams();

  const { currentUser } = useSelector((state) => state.auth);

  const chatCtx = useContext(ChatContext);

  // let room = localStorage.getItem("l");

  // useEffect(() => {
  //   if (room && room !== params.chatTitle) {
  //     socket?.current.emit("leaveRoom", {
  //       userData: {
  //         username: currentUser.username,
  //         profileImage: currentUser.picture,
  //       },
  //       room,
  //     });
  //   }

  //   setTimeout(() => {
  //     localStorage.setItem("l", params.chatTitle);
  //   }, 2000);
  // }, [params.chatTitle]);

  useEffect(() => {
    chatCtx.joinRoom(
      {
        username: currentUser.username,
        profileImage: currentUser.picture,
      },
      currentUser.username
    );
  }, [params.chatTitle]);

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
    chatCtx.sendMessage(data);
    focusInput.current.focus();
    return setMessage(" ");
  };

  const messageChangeHandler = (event) => {
    event.preventDefault();

    setMessage(event.target.value);
  };

  const onEmojiClick = (icon) => {
    setMessage((prevMessage) => prevMessage + icon);
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
          {chatCtx?.socketMessages.map((message) => {
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
              onClick={chatCtx.toggleEmoji}
            />
          </Form.Group>
          <div style={{ display: "absolute" }}>
            {chatCtx.showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MainChat;
