import React, { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import "./profileHeader.scss";
import { MdPhotoCamera } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlinePhoto } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import axios from "axios";

const ProfileHeader = () => {
  const [activeName, setActiveName] = useState("");
  const [activeEdit, setActiveEdit] = useState(false);
  const [activeEditInfo, setActiveEditInfo] = useState(false);
  const [userInfo, setUserInfo] = useOutletContext();
  const [oldInfo, setOldInfo] = useState(null);

  const location = useLocation();

  useEffect(() => {
    setOldInfo(userInfo);
  }, []);

  useEffect(() => {
    const array = location.pathname.split("/");

    setActiveName(array[2]);
  }, [location]);

  const handleChangeBg = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files) {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg"
      )
        setUserInfo({
          ...userInfo,
          bgUrl: URL.createObjectURL(e.target.files[0]),
        });

      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("username", sessionStorage.getItem("username"));

      (async () => {
        try {
          const res = await axios.put(
            "http://localhost:8080/api/v1/bg-upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  const handleChangeAvatar = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files) {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg"
      )
        setUserInfo({
          ...userInfo,
          imageUrl: URL.createObjectURL(e.target.files[0]),
        });

      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("username", sessionStorage.getItem("username"));

      (async () => {
        try {
          const res = await axios.put(
            "http://localhost:8080/api/v1/avatar-upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  const handleClickEdit = (e) => {
    setActiveEdit(true);
    setActiveEditInfo(true);
  };

  const handleCancelEdit = (e) => {
    setUserInfo({
      ...userInfo,
      fullname: oldInfo.fullname,
      hometown: oldInfo.hometown,
    });
    setActiveEdit(false);
    setActiveEditInfo(false);
  };

  const handleSaveEdit = (e) => {
    setActiveEdit(false);
    setActiveEditInfo(false);

    console.log(userInfo);

    (async () => {
      try {
        const res = await axios.put(
          "http://localhost:8080/api/v1/user",
          userInfo
        );

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <div className="profile-header">
      <div className="bg">
        <img src={userInfo?.bgUrl} alt="" />

        <label>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleChangeBg(e)}
          />
          <IconContext.Provider value={{ size: "1.4rem" }}>
            <MdPhotoCamera />
          </IconContext.Provider>
          Change cover image
        </label>
      </div>

      <label className="avatar">
        <input
          type="file"
          style={{ display: "none" }}
          onChange={(e) => handleChangeAvatar(e)}
        />
        <img src={userInfo.imageUrl} alt="" />
        <span>
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <MdPhotoCamera />
          </IconContext.Provider>
        </span>
      </label>

      <div className="info">
        <div
          className={`overview ${
            activeEditInfo === false ? "" : "display-none"
          }`}
        >
          <h2>{userInfo?.fullname || sessionStorage.getItem("username")}</h2>
          <p>{userInfo?.status || "Hanoi, Vietnam"}</p>
        </div>

        <div
          className={`overview ${
            activeEditInfo === true ? "" : "display-none"
          }`}
        >
          <input
            type="text"
            value={userInfo?.fullname}
            onChange={(e) =>
              setUserInfo({ ...userInfo, fullname: e.target.value })
            }
          />
          <input
            type="text"
            value={userInfo?.status}
            onChange={(e) =>
              setUserInfo({ ...userInfo, status: e.target.value })
            }
          />
        </div>

        <div
          className={`edit ${activeEdit === false ? "" : "display-none"}`}
          onClick={handleClickEdit}
        >
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <div className="icon">
              <FiEdit />
            </div>
          </IconContext.Provider>
          <span>Edit profile</span>
        </div>

        <div
          className={`edit save-profile ${
            activeEdit === true ? "" : "display-none"
          }`}
          onClick={handleSaveEdit}
        >
          <span>Save profile</span>
        </div>

        <div
          className={`edit cancel ${activeEdit === true ? "" : "display-none"}`}
          onClick={handleCancelEdit}
        >
          <span>Cancel</span>
        </div>
      </div>

      <div className="navigator">
        {/* <Link
          to="./posts"
          className={`${activeName === "posts" ? "active" : ""}`}
          onClick={() => setActiveName("posts")}
        >
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <div className="icon">
              <IoDocumentTextOutline />
            </div>
          </IconContext.Provider>
          <span>Posts</span>
        </Link> */}

        <Link
          to="./about"
          className={`${activeName === "about" ? "active" : ""}`}
          onClick={() => setActiveName("about")}
        >
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <div className="icon">
              <BsExclamationCircle />
            </div>
          </IconContext.Provider>
          <span>About</span>
        </Link>

        {/* <Link
          to="./friends"
          className={`${activeName === "friends" ? "active" : ""}`}
          onClick={() => setActiveName("friends")}
        >
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <div className="icon">
              <HiOutlineUserGroup />
            </div>
          </IconContext.Provider>
          <span>Friends</span>
        </Link> */}

        <Link
          to="./photos"
          className={`${activeName === "photos" ? "active" : ""}`}
          onClick={() => setActiveName("photos")}
        >
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <div className="icon">
              <HiOutlinePhoto />
            </div>
          </IconContext.Provider>
          <span>Photos</span>
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
