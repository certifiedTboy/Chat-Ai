import React, { useEffect, useContext } from "react";
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

  const params = useParams();

  return (
    <div className="container-fluid mt-5">
      <div className="grid grid-cols-12">
        <div className="col-span-2 md:col-span-4 lg:col-span-2">
          <ChatRooms />
        </div>
        <div
          className={`col-span-10 md:col-span-8 lg:col-span-8 ${classes.chat_container}`}
        >
          {params.chatTitle && <MainChat />}

          {!params.chatTitle && <EmptyChat />}
        </div>
        <div className="hidden lg:block col-span-2">
          {params.chatTitle && (
            <div className={classes.overflow}>
              {chatCtx?.roomUsers.map((user) => {
                return (
                  <div className="mb-3" key={user.userData.username}>
                    <img
                      className={classes.room_image}
                      src={user.userData.profileImage}
                      alt="room_image"
                    />
                    <NavLink
                      className={`${classes.room_link} ml-2`}
                      to={`/chat/${user.userData.username}`}
                    >
                      {user.userData.username}
                    </NavLink>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
