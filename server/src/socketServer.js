const { messageFormat } = require("./helpers/message");
const { runGeminiConversation } = require("./helpers/gemini");
const { profanityFilter } = require("./helpers/profanity-filter");
const user = require("./model/user");

const listen = async (io) => {
  const bot = { name: "T-AI" };

  // Run when client connects
  io.on("connection", (socket) => {
    socket.on("joinRoom", async (userData) => {
      const addedUser = user.addUserToChat(userData);

      socket.join(userData.room);
    });

    // Listen for chatMessage
    socket.on("chatMessage", async (msg) => {
      const chatUser = user.getCurrentChatUser(msg.sender);

      io.to(chatUser.room).emit("typing", messageFormat(bot.name, null));

      const response = await runGeminiConversation(msg?.text);

      if (response.error) {
        io.to(chatUser.room).emit(
          "message",
          messageFormat(bot.name, response.error),
        );
      } else {
        io.to(chatUser.room).emit(
          "message",
          messageFormat(bot.name, response?.result),
        );
      }

      io.to(chatUser.room).emit("stopTyping", messageFormat(bot.name, null));
    });

    // Runs when client disconnects
    socket.on("leaveRoom", ({ userData, room }) => {
      const user = userLeave(userData.username);
      if (user) {
        socket.broadcast
          .to(room)
          .emit(
            "message",
            messageFormat(bot.name, `${userData.username} has left the chat`),
          );

        // Send users and room info
        io.to(room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(room),
        });
      }
    });
  });
};

module.exports = { listen };
