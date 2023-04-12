import React from "react";
import ChatBox from "./ChatBox";
import "./messagecard.scss";

const MessageCard = () => {
  return (
    <div className="message-card">
      <div>
        <div className="avatar">
          <img
            src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/340102593_1671418876634272_7202750476793864828_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=a6vk0A7zczIAX_lDWnn&_nc_ht=scontent.fhan2-5.fna&oh=00_AfCmQPL2g1z2Mf0wgQEB0SYYB1MqG0I8zlscmWhaD1T5IQ&oe=6439A89F"
            alt=""
          />
        </div>

        <div className="wrapper">
          <div className="info">
            <span className="name">Ricky smith</span>
            <span className="time">12:42 PM</span>
          </div>
          <div className="chatbox">
            <ChatBox></ChatBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
