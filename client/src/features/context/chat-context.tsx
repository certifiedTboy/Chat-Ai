import { useRef, useState, useEffect, createContext, useContext } from "react";
import { io } from "socket.io-client";

export type Message = {
  text: string;
  id: string;
  sender: string;
  room: string;
  isSender: boolean;
};

type ChatContextType = {
  socketMessages: Message[];
  sendMessage: (messageData: Message) => void;
  joinRoom: (userData: any, room: string) => void;
  leaveRoom?: (userData: any, room: string) => void;
  setSocketMessage: (messageData: Message) => void;
  isTyping: boolean;
};

export const ChatContext = createContext<ChatContextType>({
  socketMessages: [],
  sendMessage: () => {},
  joinRoom: () => {},
  leaveRoom: () => {},
  isTyping: false,
  setSocketMessage: () => {},
});

const API_URL = import.meta.env.VITE_SERVER_SOCKET_URL;

export const ChatContextProvider = ({
  children,
}: React.PropsWithChildren<any>) => {
  const [socketMessages, setSocketMessages] = useState<Message[]>([]);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const socket = useRef(io(API_URL));

  function joinRoom(userData: any, room: string) {
    socket?.current?.emit("joinRoom", { ...userData, room });
  }

  useEffect(() => {
    socket?.current?.on("typing", () => {
      setIsTyping(true);
    });

    socket?.current?.on("stopTyping", () => {
      setIsTyping(false);
    });

    return () => {
      socket?.current?.off("typing");
      socket?.current?.off("stopTyping");
    };
  }, [socket]);

  function sendMessage(messageData: Message) {
    socket?.current?.emit("chatMessage", messageData);
  }

  useEffect(() => {
    socket?.current?.on("message", (msg: Message) => {
      setSocketMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && !lastMessage.isSender && lastMessage.id === msg.id) {
          // If the last message is from the assistant and has the same ID,
          // append the new text to it for a streaming effect.
          const updatedMessages = [...prevMessages];
          updatedMessages[prevMessages.length - 1] = {
            ...lastMessage,
            text: lastMessage.text + msg.text,
          };
          return updatedMessages;
        }
        // Otherwise, add the new message.
        return [...prevMessages, msg];
      });
    });

    return () => {
      socket?.current?.off("message");
    };
  }, [socket]);

  const value = {
    sendMessage,
    socketMessages,
    joinRoom,
    isTyping,
    setSocketMessage: (messageData: Message) =>
      setSocketMessages((socketMessage) => [...socketMessage, messageData]),
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export function useChatContext() {
  return useContext(ChatContext);
}
