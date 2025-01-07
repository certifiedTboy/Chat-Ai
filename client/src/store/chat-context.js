import { useRef, useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";
import useSound from "use-sound";
import sentMessage from "../Assets/sounds/sentmessage.mp3";

export const ChatContext = createContext({
  socketMessages: [],
  roomUsers: [],
  showEmoji: false,
  toggleEmoji: () => {},
  sendMessage: (messageData) => {},
  joinRoom: (userData, room) => {},
  leaveRoom: (userData, room) => {},
  getRoomUsers: () => {},
});

// const API_URL = "http://localhost:3001";

const API_URL = "https://chat-ai-server-mwfg.onrender.com";

const ChatContextProvider = ({ children }) => {
  const [socketMessages, setSocketMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const socket = useRef(io(API_URL));

  const [play2] = useSound(sentMessage);

  const sendMessage = async (messageData) => {
    socket?.current?.emit("chatMessage", messageData);
    play2();
  };

  useEffect(() => {
    const messageSocket = socket?.current;
    messageSocket.on("message", (msg) => {
      if (msg.type || msg.type === "new-msg") {
        return setSocketMessages([msg]);
      }

      setSocketMessages((socketMessage) => [...socketMessage, msg]);
    });

    return () => messageSocket?.off("message");
  }, [socket]);

  const joinRoom = (userData, room) => {
    socket?.current?.emit("joinRoom", { userData, room });
  };

  const getRoomUsers = () => {
    socket?.current.on("roomUsers", ({ room, users }) => {
      return setRoomUsers(users);
    });
  };

  const toggleEmoji = () => {
    if (showEmoji) {
      setShowEmoji(false);
    } else {
      setShowEmoji(true);
    }
  };

  const value = {
    sendMessage,
    socketMessages,
    joinRoom,
    getRoomUsers,
    roomUsers,
    toggleEmoji,
    showEmoji,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
