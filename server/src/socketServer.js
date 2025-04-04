const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./helpers/sockets/chatHelpers");
const messageFormat = require("./helpers/sockets/messageFormat");
const runConversation = require("./helpers/sockets/gpt/gpt");
const runGeminiConversation = require("./helpers/sockets/googleGemini/googleGemini");
const {
  createNewCount,
  updateCount,
} = require("./services/questionCountServices");
const {
  profanityFilter,
} = require("./helpers/sockets/ProfanityFilter/ProfanityFilter");

const listen = async (io) => {
  const bot = { name: "T-AI" };

  // Run when client connects
  io.on("connection", (socket) => {
    socket.on("joinRoom", async ({ userData, room }) => {
      const user = userJoin(socket.id, userData, room);
      socket.join(user.room);

      // await createNewCount(userData.username);

      if (user.room === userData.username) {
        return socket.emit(
          "message",
          messageFormat(
            bot.name,
            `Ask general questions to get instant answers... There is limit to numbers of question you are permmitted to ask per day and vulgar words are not permitted`,
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

      // profanity filter
      const isBad = await profanityFilter(msg.message);

      if (user.room === user.userData.username) {
        if (isBad) {
          return io
            .to(user.room)
            .emit(
              "message",
              messageFormat(
                bot.name,
                "Vulgar words are not permitted",
                undefined
              )
            );
        }

        // check if questioncount exist
        // const userQuestionCount = await updateCount(user.userData.username);

        // if (userQuestionCount.count > 0) {
        //   return io
        //     .to(user.room)
        //     .emit(
        //       "message",
        //       messageFormat(
        //         bot.name,
        //         "You have exceeded your number of trial to ask questions",
        //         undefined
        //       )
        //     );
        // }

        // const response = await runGeminiConversation(
        //   msg.message
        //   // `${msg.message}  return response in html format wrapping code syntax in pre tag`
        // );

        const response = "Hello dear how are you doing today?";
        // const response =
        //   "```javascript function addNumbers(num1, num2) { return num1 + num2; } const num1 = 5; const num2 = 3; const sum = addNumbers(num1, num2); console.log(sum); // Output: 8 ```";
        if (response.error) {
          return io
            .to(user.room)
            .emit(
              "message",
              messageFormat(bot.name, response.error, undefined)
            );
        }
        // if (userQuestionCount.count == 0) {
        io.to(user.room).emit(
          "message",
          messageFormat(bot.name, response, undefined)
        );
      }
      // }
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
