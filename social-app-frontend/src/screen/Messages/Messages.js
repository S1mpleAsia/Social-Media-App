import React, { useEffect, useRef, useState } from "react";
import "./messages.scss";
import Card from "../../components/chat/Card";
import MessageCard from "../../components/chat/MessageCard";
import { BiSearch } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import MessageHeader from "../../components/chat/MessageHeader";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import axios from "axios";

var stompClient = null;
const Messages = () => {
  const messageRef = useRef();
  const bottomRef = useRef(null);
  const [conversation, setConversation] = useState(0);
  const [groupMessage, setGroupMessage] = useState([]);
  const [privateMessage, setPrivateMessage] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [userData, setUserData] = useState({
    senderName: "",
    receiverName: "",
    connected: false,
    content: "",
  });

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    console.log(friendList);
  }, [friendList]);

  useEffect(() => {
    (async () => {
      const info = await axios.get("http://localhost:8080/api/v1/user", {
        params: {
          username: sessionStorage.getItem("username"),
        },
      });

      let data = info.data;
      console.log(data);
      if (!data.bgUrl) data.bgUrl = "/images/bg.jpg";

      if (!data.imageUrl) data.imageUrl = "/images/Ice_Bear.jpg";

      setUserInfo(data);
      connect(data.fullname);

      try {
        const res = await axios.get("http://localhost:8080/api/v1/friends", {
          params: {
            id: info.data.id,
          },
        });

        setFriendList([...friendList, ...res.data]);

        // friendList.push()
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/message");
        setPrivateMessage([...privateMessage, ...res.data]);
        console.log("Ok");
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    messageRef.current.value = "";
    bottomRef.current?.lastElementChild?.scrollIntoView();
  }, [groupMessage, privateMessage, conversation]);

  const connect = (name) => {
    var socket = new SockJS("http://localhost:8080/ws");
    stompClient = over(socket);
    stompClient.connect({}, () => onConnected(name), onError);
  };

  const onConnected = (name) => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/group/public", onPublicMessage);
    stompClient.subscribe(
      // "/user/David/private",
      "/user/" + name + "/private",
      onPrivateMessage
    );
    // stompClient.subscribe("/group/notify-all", onUserNotify);

    // sendUserNotify();
  };

  const onPublicMessage = (payload) => {
    const payloadData = JSON.parse(payload.body);
    groupMessage.push(payloadData);
    setGroupMessage([...groupMessage]);
  };

  const onPrivateMessage = (payload) => {
    console.log("Receive Private message");
    const payloadData = JSON.parse(payload.body);
    setPrivateMessage((prevMessage) => [...prevMessage, payloadData]);
  };

  const sendPrivateMessage = () => {
    if (messageRef.current.value === "") return;

    const data = {
      senderName: userInfo?.fullname,
      receiverName: friendList[conversation].fullname,
      content: userData.content,
      date: formatAMPM(new Date()),
      fromId: userInfo?.id,
      toId: friendList[conversation].id,
    };

    console.log(data);

    stompClient.send("/app/private-message", {}, JSON.stringify(data));

    (async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/message",
          data
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const sendPublicMessage = () => {
    if (messageRef.current.value === "") return;
    stompClient.send(
      "/app/public-message",
      {},
      JSON.stringify({
        senderName: userInfo?.fullname,
        receiverName: "Group",
        content: userData.content,
        date: formatAMPM(new Date()),
      })
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleInput = (e) => {
    const content = e.target.value;
    setUserData({ ...userData, content: content });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // sendPublicMessage();
      sendPrivateMessage();
    }
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  function separateMessage(msg) {
    if (msg.senderName === userInfo?.fullname)
      return msg.receiverName === friendList[conversation]?.fullname;
    else if (msg.senderName === friendList[conversation]?.fullname)
      return msg.receiverName === userInfo?.fullname;
  }

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
          {friendList.map((item, index) => (
            <Card
              key={index}
              active={index === conversation ? "card-active" : ""}
              conversation={conversation}
              setConversation={setConversation}
              index={index}
              info={item}
              privateMessage={privateMessage}
              userInfo={userInfo}
              friendList={friendList}
            ></Card>
          ))}
        </div>
      </div>

      <div className="container">
        <MessageHeader info={friendList[conversation]}></MessageHeader>

        <div className="content" ref={bottomRef}>
          {privateMessage
            .filter((msg) => separateMessage(msg))
            .map((item, index) => (
              <MessageCard
                msg={item}
                fromself={
                  userInfo?.fullname === item.senderName ? "send" : "received"
                }
                key={index}
              ></MessageCard>
            ))}
        </div>

        <div className="textbox">
          <div className="text-bar">
            <input
              type="text"
              placeholder="Your message"
              value={userData.content}
              ref={messageRef}
              onChange={(e) => {
                handleInput(e);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>

          <IconContext.Provider value={{ size: "1.5rem" }}>
            <div className="send-icon" onClick={sendPrivateMessage}>
              <IoMdSend />
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Messages;
