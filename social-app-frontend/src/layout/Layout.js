import React, { useEffect, useState } from "react";
import Leftbar from "../components/leftbar/Leftbar";
import Rightbar from "../components/rightbar/Rightbar";
import { Outlet } from "react-router-dom";
import "./layout.scss";
import axios from "axios";

const Layout = () => {
  const [userInfo, setUserInfo] = useState({
    id: 0,
    address: "",
    bgUrl: "",
    imageUrl: "",
    studiedAt: "",
    fullname: "",
    hometown: "",
    account: {
      accountId: 0,
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/user", {
          params: {
            username: sessionStorage.getItem("username"),
          },
        });

        let data = res.data;
        console.log(data);
        if (!data.bgUrl) data.bgUrl = "/images/bg.jpg";

        if (!data.imageUrl) data.imageUrl = "/images/Ice_Bear.jpg";

        setUserInfo(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="layout">
      <Leftbar></Leftbar>
      <Outlet context={[userInfo, setUserInfo]}></Outlet>
      <Rightbar></Rightbar>
    </div>
  );
};

export default Layout;
