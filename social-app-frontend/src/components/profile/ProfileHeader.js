import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./profileHeader.scss";
import { MdPhotoCamera } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlinePhoto } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";

const ProfileHeader = () => {
  const [activeName, setActiveName] = useState("");
  const [bgImage, setBgImage] = useState("/images/bg.jpg");
  const location = useLocation();

  useEffect(() => {
    const array = location.pathname.split("/");

    setActiveName(array[2]);
  }, [location]);

  const handleChangeBg = (e) => {
    if (e.target.files) {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg"
      )
        setBgImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="profile-header">
      <div className="bg">
        <img src={bgImage} alt="" />

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

      <div className="avatar">
        <img src="/images/Ice_Bear.jpg" alt="" />
        <span>
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <MdPhotoCamera />
          </IconContext.Provider>
        </span>
      </div>

      <div className="info">
        <div className="overview">
          <h2>Darwin Watterson</h2>
          <p>Hanoi, VietNam</p>
        </div>

        {/* <div className="change-info">
          <button>Save profile</button>
          <button>Cancel</button>
        </div> */}

        <div className="edit">
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <div className="icon">
              <FiEdit />
            </div>
          </IconContext.Provider>
          <span>Edit profile</span>
        </div>
      </div>

      <div className="navigator">
        <Link
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
        </Link>

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

        <Link
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
        </Link>

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
