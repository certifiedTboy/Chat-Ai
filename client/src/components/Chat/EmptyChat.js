import React from "react";
import emoji from "../../Assets/images/emoji.png";
import classes from "./Chat.module.css";

const EmptyChat = () => {
  return (
    <div
      style={{ height: "80vh" }}
      className="d-flex flex-column justify-content-center align-items-center pt-5"
    >
      <h1 className={classes.main_text}> Welcome To T-Robotics</h1>

      <img className={classes.main_image} src={emoji} />
    </div>
  );
};

export default EmptyChat;
