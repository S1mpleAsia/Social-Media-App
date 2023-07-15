import React from "react";
import { IoCall, IoVideocam } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { FiMoreHorizontal } from "react-icons/fi";
import "./messageHeader.scss";

const MessageHeader = ({ info }) => {
  return (
    <div className="message-header">
      <div className="leftside">
        <div className="avatar">
          <img src={info?.imageUrl} alt="" />
        </div>

        <div className="info">
          <h3>{info?.fullname}</h3>
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
