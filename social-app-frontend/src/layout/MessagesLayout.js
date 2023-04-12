import React from "react";
import Leftbar from "../components/leftbar/Leftbar";
import Messages from "../screen/Messages/Messages";
import "./messageslayout.scss";

const MessagesLayout = () => {
  return (
    <div className="layout">
      <Leftbar></Leftbar>
      <Messages></Messages>
    </div>
  );
};

export default MessagesLayout;
