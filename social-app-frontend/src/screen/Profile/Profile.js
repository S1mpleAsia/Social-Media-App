import React from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { Outlet } from "react-router-dom";
import "./profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <ProfileHeader></ProfileHeader>
      <Outlet></Outlet>
    </div>
  );
};

export default Profile;
