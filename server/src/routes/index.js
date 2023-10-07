const express = require("express");
const authRoute = require("./authRoute");

const v1Routes = express.Router();

v1Routes.use("/auth", authRoute);

module.exports = v1Routes;
