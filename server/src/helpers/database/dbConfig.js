const mongoose = require("mongoose");
const envVariable = require("../../config/index");

// Update below to match your own MongoDB connection string.
const MONGO_URL = envVariable.DB_URL;

mongoose.connection.once("open", () => {
  console.log("db connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
};

module.exports = mongoConnect;
