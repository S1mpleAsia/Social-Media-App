import React from "react";
import { IoCall, IoVideocam } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { FiMoreHorizontal } from "react-icons/fi";
import "./messageHeader.scss";

const MessageHeader = () => {
  return (
    <div className="message-header">
      <div className="leftside">
        <div className="avatar">
          <img
            src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/340102593_1671418876634272_7202750476793864828_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=a6vk0A7zczIAX_lDWnn&_nc_ht=scontent.fhan2-5.fna&oh=00_AfCmQPL2g1z2Mf0wgQEB0SYYB1MqG0I8zlscmWhaD1T5IQ&oe=6439A89F"
            alt=""
          />
        </div>

        <div className="info">
          <h3>Ricky Smith</h3>
          <p>Online</p>
        </div>
      </div>

      <div className="rightside">
        <IconContext.Provider value={{ size: "1.4em" }}>
          <div>
            <IoCall />
          </div>
        </IconContext.Provider>

        <IconContext.Provider value={{ size: "1.4em" }}>
          <div>
            <IoVideocam />
          </div>
        </IconContext.Provider>

        <IconContext.Provider value={{ size: "1.4em" }}>
          <div>
            <FiMoreHorizontal />
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default MessageHeader;
