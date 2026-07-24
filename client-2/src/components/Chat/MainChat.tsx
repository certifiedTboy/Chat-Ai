import React, { useRef, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChatContext } from "../../store/chat-context";
import ScrollToBottom from "react-scroll-to-bottom";
import EmojiPicker from "./EmojiPicker";
import Message from "./Message";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
      currentUser.username,
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
    <div className="mt-5 flex flex-col" style={{ height: "80vh" }}>
      <div className="border-b px-4 py-2">
        <h2 className="font-bold text-lg">{params.chatTitle}</h2>
      </div>

      <ScrollToBottom className={`${classes.chatBoxTop} flex-grow`}>
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

      <form onSubmit={sendMessageHandler} className="p-4 border-t">
        <div className="relative">
          <Input
            value={message}
            ref={focusInput}
            placeholder="Share your thought..."
            onChange={messageChangeHandler}
            className="pr-12"
          />
          <img
            src={emojiIcon}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer"
            onClick={chatCtx.toggleEmoji}
            alt="emoji picker"
          />
        </div>
        {chatCtx.showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
      </form>
    </div>
  );
};

export default MainChat;
