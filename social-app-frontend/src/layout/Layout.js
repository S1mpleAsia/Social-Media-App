import React from "react";
import Leftbar from "../components/leftbar/Leftbar";
import Rightbar from "../components/rightbar/Rightbar";
import { Outlet } from "react-router-dom";
import "./layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <Leftbar></Leftbar>
      <Outlet></Outlet>
      <Rightbar></Rightbar>
    </div>
  );
};

export default Layout;
