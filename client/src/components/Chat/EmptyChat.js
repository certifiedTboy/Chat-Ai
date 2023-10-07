import React from "react";
import emoji from "../../Assets/images/emoji.png";
import classes from "./Chat.module.css";

const EmptyChat = () => {
  return (
    <div className="text-center mt-5">
      <h1 className={classes.main_text}> Welcome To T-Robotics</h1>

      <img className={classes.main_image} src={emoji} />
    </div>
  );
};

export default EmptyChat;
