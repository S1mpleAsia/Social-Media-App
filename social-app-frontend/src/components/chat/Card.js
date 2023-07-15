import React, { useEffect, useState } from "react";
import "./card.scss";

const Card = ({
  key,
  active,
  conversation,
  setConversation,
  index,
  info,
  privateMessage,
  userInfo,
  friendList,
}) => {
  const [lastMessage, setLastMessage] = useState("");
  const handleCardClick = (e) => {
    setConversation(index);
  };

  useEffect(() => {
    filterLastMessage();
  }, [privateMessage]);

  const filterLastMessage = () => {
    const list = privateMessage.filter(
      (message) =>
        (message.fromId === userInfo?.id &&
          message.toId === friendList[index].id) ||
        (message.toId === userInfo?.id &&
          message.fromId === friendList[index].id)
    );

    if (list.length === 0) setLastMessage("");
    else setLastMessage(list[list.length - 1].content);
  };

  return (
    <div className={`card ${active}`} onClick={handleCardClick}>
      <div className="avatar">
        <img src={info?.imageUrl} alt="" />
      </div>

      <div className="detail">
        <div className="name">
          <h3>{info.fullname}</h3>
          <p>4m</p>
        </div>

        <p className="message">{lastMessage}</p>
      </div>
    </div>
  );
};

export default Card;
