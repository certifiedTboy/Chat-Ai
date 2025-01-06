import React from "react";
import Chat from "../components/Chat/Chat";
import ChatContextProvider from "../store/chat-context";

const ChatPage = () => {
  return (
    <ChatContextProvider>
      <Chat />
    </ChatContextProvider>
  );
};

export default ChatPage;
