const http = require("http");
const app = require("./app");
const mongoConnect = require("./helpers/database/dbConfig");
const { Server } = require("socket.io");
const socketServer = require("./socketServer");
const httpServer = http.createServer(app);

const envVariable = require("./config/index");

const PORT = envVariable.PORT || 3001;

const io = new Server(httpServer, {
  cors: {
    origin: "https://chat-ai-client-alpha.vercel.app",
    // origin: "http://localhost:3000",
  },
});

const startServer = async () => {
  await mongoConnect();
  httpServer.listen(PORT, () => {
    console.log(`Chat server is live on port: ${PORT}`);
  });

  socketServer.listen(io);
};

startServer();
