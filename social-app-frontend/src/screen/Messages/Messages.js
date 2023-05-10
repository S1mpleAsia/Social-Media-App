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
  const auth = sessionStorage.getItem("username");
  const messageRef = useRef();
  const bottomRef = useRef(null);
  const [conversation, setConversation] = useState(0);
  const [groupMessage, setGroupMessage] = useState([]);
  const [privateMessage, setPrivateMessage] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [userData, setUserData] = useState({
    senderName: auth,
    receiverName: "",
    connected: false,
    content: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/message");
        setPrivateMessage([...privateMessage, ...res.data]);
        console.log("Ok");
      } catch (err) {
        console.log(err);
      }
    })();

    connect();

    (async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/friends", {
          params: {
            username: auth,
          },
        });

        setFriendList([...friendList, ...res.data]);

        // friendList.push()
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    messageRef.current.value = "";
    bottomRef.current?.lastElementChild?.scrollIntoView();
  }, [groupMessage, privateMessage, conversation]);

  const connect = () => {
    var socket = new SockJS("http://localhost:8080/ws");
    stompClient = over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/group/public", onPublicMessage);
    stompClient.subscribe(
      // "/user/David/private",
      "/user/" + userData.senderName + "/private",
      onPrivateMessage
    );
    // stompClient.subscribe("/group/notify-all", onUserNotify);

    // sendUserNotify();
  };

  const onUserNotify = (payload) => {
    const payloadData = JSON.parse(payload.body);

    if (payloadData.username === auth) return;

    const friend = friendList.filter(
      (user) => user.username === payloadData.username
    );

    if (friend.length === 0) {
      friendList.push(payloadData);
      setFriendList([...friendList]);
    }
  };

  const sendUserNotify = () => {
    stompClient.send(
      "/app/user-notify",
      {},
      JSON.stringify({
        username: auth,
        password: "1234",
        image_url: "",
      })
    );
  };

  const onPublicMessage = (payload) => {
    const payloadData = JSON.parse(payload.body);
    groupMessage.push(payloadData);
    setGroupMessage([...groupMessage]);
  };

  const onPrivateMessage = (payload) => {
    const payloadData = JSON.parse(payload.body);
    privateMessage.push(payloadData);
    setPrivateMessage([...privateMessage]);
  };

  const sendPrivateMessage = () => {
    if (messageRef.current.value === "") return;

    const data = {
      senderName: auth,
      receiverName: friendList[conversation].username,
      content: userData.content,
      date: formatAMPM(new Date()),
    };

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
        senderName: auth,
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
    if (msg.senderName === auth)
      return msg.receiverName === friendList[conversation]?.username;
    else if (msg.senderName === friendList[conversation]?.username)
      return msg.receiverName === auth;
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
            ></Card>
          ))}
        </div>
      </div>

      <div className="container">
        <MessageHeader
          username={friendList[conversation]?.username}
        ></MessageHeader>

        <div className="content" ref={bottomRef}>
          {privateMessage
            .filter((msg) => separateMessage(msg))
            .map((item, index) => (
              <MessageCard
                msg={item}
                fromself={auth === item.senderName ? "send" : "received"}
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
