import React, { useEffect, useRef, useState } from "react";
import { BiHome, BiLogOut } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { RiMessengerLine } from "react-icons/ri";
import "./leftbar.scss";
import { IconContext } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom";

const Leftbar = () => {
  const [activeName, setActiveName] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const array = location.pathname.split("/");

    setActiveName(array[1]);
  }, [location]);

  return (
    <div className="leftbar">
      <div className="container">
        <h2>Navigation</h2>

        <div className="items">
          <Link
            to="/"
            className={`${activeName === "" ? "active" : ""}`}
            onClick={() => setActiveName("")}
          >
            <IconContext.Provider value={{ size: "1.5rem" }}>
              <div>
                <BiHome />
              </div>
            </IconContext.Provider>
            <span>Home</span>
          </Link>

          <Link
            to="/profile/about"
            className={`${activeName === "profile" ? "active" : ""}`}
            onClick={() => setActiveName("profile")}
          >
            <IconContext.Provider value={{ size: "1.5rem" }}>
              <div>
                <HiOutlineUserGroup />
              </div>
            </IconContext.Provider>
            <span>Profile</span>
          </Link>

          <Link
            to="/messages"
            className={`${activeName === "messages" ? "active" : ""}`}
            onClick={() => setActiveName("messages")}
          >
            <IconContext.Provider value={{ size: "1.5rem" }}>
              <div>
                <RiMessengerLine />
              </div>
            </IconContext.Provider>

            <span>Messages</span>
          </Link>

          {/* <Link
            to="/saved"
            className={`${activeName === "saved" ? "active" : ""}`}
            onClick={() => setActiveName("saved")}
          >
            <IconContext.Provider value={{ size: "1.5rem" }}>
              <div>
                <AiOutlineHeart />
              </div>
            </IconContext.Provider>

            <span>Liked posts</span>
          </Link> */}

          <Link
            to="/notification"
            className={`${activeName === "notification" ? "active" : ""}`}
            onClick={() => setActiveName("notification")}
          >
            <IconContext.Provider value={{ size: "1.5rem" }}>
              <div>
                <IoNotificationsOutline />
              </div>
            </IconContext.Provider>
            <span>Notifications</span>
          </Link>

          <a href="#">
            <IconContext.Provider value={{ size: "1.6rem" }}>
              <div>
                <BiLogOut />
              </div>
            </IconContext.Provider>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
