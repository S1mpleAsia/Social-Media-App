import React from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { Outlet, useOutletContext } from "react-router-dom";
import "./profile.scss";

const Profile = () => {
  const [userInfo, setUserInfo] = useOutletContext();

  return (
    <div className="profile">
      <ProfileHeader></ProfileHeader>
      <Outlet context={[userInfo, setUserInfo]}></Outlet>
    </div>
  );
};

export default Profile;
