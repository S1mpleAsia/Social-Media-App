import React, { useEffect, useState } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { IoLocationSharp } from "react-icons/io5";
import { FaHome, FaSchool } from "react-icons/fa";
import "./about.scss";
import axios from "axios";
import { IconContext } from "react-icons/lib";
import { FiEdit } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";

const About = () => {
  const [active, setActive] = useState(false);
  const [userInfo, setUserInfo] = useOutletContext();

  const handleEdit = (e) => {
    setActive(!active);
  };

  const handleSave = async (e) => {
    setActive(!active);

    const res = await axios.put("http://localhost:8080/api/v1/user", userInfo);
    console.log(res);
  };

  useEffect(() => console.log(userInfo), [userInfo]);

  return (
    <div className="about">
      <h2>About me</h2>

      <div
        className={`edit ${active ? "unactive" : "active"}`}
        onClick={handleEdit}
      >
        <IconContext.Provider value={{ size: "1.2rem" }}>
          <div className="icon">
            <FiEdit />
          </div>
        </IconContext.Provider>
        <span>Edit</span>
      </div>
      <div
        className={`edit ${active ? "active" : "unactive"}`}
        onClick={handleSave}
      >
        <IconContext.Provider value={{ size: "1.2rem" }}>
          <div className="icon">
            <FiEdit />
          </div>
        </IconContext.Provider>
        <span>Save</span>
      </div>

      <div class={`form__group field ${active ? "active" : ""}`}>
        <input
          value={userInfo?.currentEducation}
          onChange={(e) =>
            setUserInfo({ ...userInfo, currentEducation: e.target.value })
          }
          type="input"
          class="form__field"
          placeholder="Name"
          name="name"
          id="name"
          required
        />
        <label for="name" class="form__label">
          Studying
        </label>
      </div>

      <div class={`form__group field ${active ? "active" : ""}`}>
        <input
          value={userInfo?.studiedAt}
          onChange={(e) =>
            setUserInfo({ ...userInfo, studiedAt: e.target.value })
          }
          type="input"
          class="form__field"
          placeholder="Name"
          name="name"
          id="name"
          required
        />
        <label for="name" class="form__label">
          Đã học tại
        </label>
      </div>

      <div class={`form__group field ${active ? "active" : ""}`}>
        <input
          value={userInfo?.adrress}
          onChange={(e) => setUserInfo({ ...userInfo, adress: e.target.value })}
          type="input"
          class="form__field"
          placeholder="Name"
          name="name"
          id="name"
          required
        />
        <label for="name" class="form__label">
          Sống tại
        </label>
      </div>

      <div class={`form__group field ${active ? "active" : ""}`}>
        <input
          value={userInfo?.hometown}
          onChange={(e) =>
            setUserInfo({ ...userInfo, hometown: e.target.value })
          }
          type="input"
          class="form__field"
          placeholder="Name"
          name="name"
          id="name"
          required
        />
        <label for="name" class="form__label">
          Đến từ
        </label>
      </div>

      <div className={`description ${active ? "unactive" : ""}`}>
        <div>
          <FaSchool />
          <span>
            Studying tại{" "}
            {userInfo?.currentEducation || "Đại học Bách Khoa Hà nội"}
          </span>
        </div>

        <div>
          <GiGraduateCap />
          <span>
            Đã học tại {userInfo?.studiedAt || "Đại học Bách Khoa Hà nội"}
          </span>
        </div>

        <div>
          <FaHome />
          <span>Sống tại {userInfo?.adress || "Hà Nội"}</span>
        </div>

        <div>
          <IoLocationSharp />
          <span>Đến từ {userInfo?.hometown || "Hà Nội"}</span>
        </div>
      </div>
    </div>
  );
};

export default About;
