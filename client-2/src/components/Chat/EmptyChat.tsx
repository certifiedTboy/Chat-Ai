import emoji from "../../Assets/images/emoji.png";
import classes from "./Chat.module.css";

const EmptyChat = () => {
  return (
    <div
      style={{ height: "80vh" }}
      className="flex flex-col justify-center items-center pt-5"
    >
      <h1 className="text-3xl font-bold"> Welcome To T-Robotics</h1>

      <img className={classes.main_image} src={emoji} />
    </div>
  );
};

export default EmptyChat;
