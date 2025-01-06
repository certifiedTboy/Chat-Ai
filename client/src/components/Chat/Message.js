import { Fragment } from "react";
import { useSpeech } from "react-text-to-speech";
import { removeAsteriks } from "../../helpers/messageHelpers";
import classes from "./Chat.module.css";
import Moment from "react-moment";

const Message = (props) => {
  const {
    isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
    start, // Function to start the speech or put it in queue
    pause, // Function to pause the speech
  } = useSpeech({ text: removeAsteriks(props?.message) });

  return (
    <Fragment>
      <div>
        {props.own && (
          <div className={`${classes.message} ${classes.own}`} key={props.id}>
            <h5 className={classes.username_own}>{props.sender}</h5>
            <Moment className={classes.meta_own} fromNow>
              {new Date()}
            </Moment>
            <div className={classes.messageTop}>
              <p className={classes.messageText}>{props.message}</p>
              <img
                className={classes.messageImg}
                src={props.userImage}
                alt="profile img"
              />
            </div>
          </div>
        )}

        {!props.own && (
          <div className={`${classes.message}`} key={props.id}>
            <h5 className={classes.username_other}>{props.sender}</h5>
            <Moment className={classes.meta} fromNow>
              {new Date()}
            </Moment>
            <div className={classes.messageTop}>
              <img
                className={classes.messageImg}
                src={props.userImage}
                alt="profile img"
              />
              <p className={classes.messageText}>
                {removeAsteriks(props.message)}
              </p>
            </div>

            <div className={classes.btn_div}>
              <button
                onClick={!isInQueue ? start : pause}
                className={classes.speak_btn}
              >
                {!isInQueue ? (
                  <i class="fa-solid fa-play"></i>
                ) : (
                  <i class="fa-solid fa-pause"></i>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Message;
