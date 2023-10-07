const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./helpers/sockets/chatHelpers");
const messageFormat = require("./helpers/sockets/messageFormat");
const runConversation = require("./helpers/sockets/gpt/gpt");
const { createNewCount } = require("./services/questionCountServices");

const listen = async (io) => {
  const bot = { name: "T-AI" };

  // Run when client connects
  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ userData, room }) => {
      const user = userJoin(socket.id, userData, room);
      socket.join(user.room);

      if (user.room === userData.username) {
        return socket.emit(
          "message",
          messageFormat(
            bot.name,
            `Ask general questions to get instant answers... There is limit to numbers of question you are permmitted to ask per day`,
            undefined,
            "new-msg"
          )
        );
      }

      // // Broadcast to other room users when a user connects
      // socket.broadcast
      //   .to(user.room)
      //   .emit(
      //     "message",
      //     messageFormat(
      //       bot.name,
      //       `${user.userData.username} has joined the chat`,
      //       undefined
      //     )
      //   );

      // // Send users and room info to client
      // io.to(user.room).emit("roomUsers", {
      //   room: user.room,
      //   users: getRoomUsers(user.room),
      // });
    });

    // Listen for chatMessage
    socket.on("chatMessage", async (msg) => {
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit(
        "message",
        messageFormat(
          user.userData.username,
          msg.message,
          user.userData.profileImage
        )
      );

      // check if questioncount exist
      const userQuestionCount = await createNewCount(user.userData.username);

      if (user.room === user.userData.username) {
        if (userQuestionCount.count > 0) {
          return io
            .to(user.room)
            .emit(
              "message",
              messageFormat(
                bot.name,
                "You have exceeded your number of trial to ask questions",
                undefined
              )
            );
        }

        const response = await runConversation(msg.message);
        if (response && userQuestionCount.count == 0) {
          io.to(user.room).emit(
            "message",
            messageFormat(bot.name, response, undefined)
          );
        }
      }
    });

    // Runs when client disconnects
    socket.on("leaveRoom", ({ userData, room }) => {
      const user = userLeave(userData.username);
      if (user) {
        socket.broadcast
          .to(room)
          .emit(
            "message",
            messageFormat(
              bot.name,
              `${userData.username} has left the chat`,
              undefined
            )
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
