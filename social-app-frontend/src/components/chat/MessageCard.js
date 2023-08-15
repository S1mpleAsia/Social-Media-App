import React from "react";
import "./messagecard.scss";

const MessageCard = (props) => {
  return (
    <div className={`message-card ${props.fromself}`}>
      <div>
        <div className="avatar">
          <img src="/images/Ice_Bear.jpg" alt="" />
        </div>

        <div className="wrapper">
          <div className="info">
            <span className="name">{props.msg.senderName}</span>
            <span className="time">{props.msg.date}</span>
          </div>
          <div className="chatbox">
            <p>{props.msg.content}</p>
          </div>

          {props?.msg?.imageUrl ? (
            <div className={`image-wrapper ${props.fromself}`}>
              <div className="image">
                <img src={props?.msg?.imageUrl} alt="" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
