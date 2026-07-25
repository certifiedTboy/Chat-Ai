const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const v1Routes = require("./routes/index");

const app = express();

const allowedOrigins = [
  "https://chat-ai-client-alpha.vercel.app",
  "http://localhost:5173",
  "https://chat-ai-seven-indol.vercel.app",
];

const expressOptions = {
  urlencodExtended: true,
  requestSizeLimit: "100kb",
};

const corsOption = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "X-Auth-Token",
    "Authorization",
    "Accept-Encoding",
    "Connection",
    "Content-Length",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: allowedOrigins,
  preflightContinue: false,
};

function globalExceptionHandler(err, req, res, _next) {
  let statusCode = err?.statusCode || 500;
  let message = err?.message || "Something went wrong";
  let error;

  res.status(statusCode).json({ success: false, statusCode, message, error });
}

app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json({ limit: expressOptions.requestSizeLimit }));
app.use("/api/v1", v1Routes);
app.use(globalExceptionHandler);

// Server health test
app.get("/", (req, res) => {
  res.json({ message: "server is live" });
});

module.exports = app;
