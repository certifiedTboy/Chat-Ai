const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const v1Routes = require("./routes/index");

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const expressOptions = {
  urlencodExtended: true,
  requestSizeLimit: "20mb",
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

const GlobalErrorHandler = (err, req, res, next) => {
  next();
};

app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json({ limit: expressOptions.requestSizeLimit }));
app.use("/api/v1", v1Routes);
app.use(GlobalErrorHandler);

// Server health test
app.get("/", (req, res) => {
  res.json({ message: "server is live" });
});

module.exports = app;
