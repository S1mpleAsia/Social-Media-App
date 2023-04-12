import React, { useState } from "react";
import "./messages.scss";
import Card from "../../components/chat/Card";
import MessageCard from "../../components/chat/MessageCard";
import { BiSearch } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import MessageHeader from "../../components/chat/MessageHeader";
import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient = null;
const Messages = () => {
  const [publicChat, setPublicChat] = useState([]);
  const [privateChat, setPrivateChat] = useState(new Map());
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  const connect = () => {
    var socket = new SockJS("http://localhost:8080/ws");
    stompClient = over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/group/public", onPublicMessageReceived);
    stompClient.subscribe(
      "user" + userData.username + "/private",
      onPrivateMessageReceived
    );
  };

  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);

    switch (payload.status) {
      case "JOIN":
        if (!privateChat.get(payloadData.senderName)) {
          privateChat.set(payloadData.senderName, []);
          setPrivateChat(new Map(privateChat));
        }
        break;

      case "MESSAGE":
        publicChat.push(payloadData);
        setPublicChat([...publicChat]);
        break;

      default:
        break;
    }
  };

  const onPrivateMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload);

    if (privateChat.get(payloadData.senderName)) {
      privateChat.get(payloadData.senderName).push(payloadData);
      setPrivateChat(new Map(privateChat));
    } else {
      let list = [];
      list.push(payloadData);
      privateChat.set(payloadData.senderName, list);
      setPrivateChat(new Map(privateChat));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <div className="chatpage">
      <div className="chat-group">
        <div className="search">
          <IconContext.Provider value={{ size: "1.4rem" }}>
            <div className="search-icon">
              <BiSearch />
            </div>
          </IconContext.Provider>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="card-list">
          <Card active="card-active"></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>

      <div className="container">
        <MessageHeader></MessageHeader>

        <div className="content">
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
        </div>

        <div className="textbox">
          <div className="text-bar">
            <input type="text" placeholder="Your message" />
          </div>

          <IconContext.Provider value={{ size: "1.5rem" }}>
            <div className="send-icon" onClick={connect}>
              <IoMdSend />
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Messages;
