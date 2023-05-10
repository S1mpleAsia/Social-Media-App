import React, { useEffect } from "react";
import Post from "../../components/post/Post";
import "./home.scss";
import { BsPerson, BsEmojiSmile } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const auth = sessionStorage.getItem("username");
  useEffect(() => {
    if (!auth) navigate("/login");
  }, []);

  return (
    <div className="homepage">
      <div className="top-bar">
        <div className="status-bar">
          <div>
            <img src="/images/Ice_Bear.jpg" alt="" />
          </div>

          <textarea placeholder={`Whats on your wing, ${auth}?`}></textarea>
        </div>

        <div className="group-btn">
          <div className="group-emotion">
            <button>
              <IconContext.Provider value={{ size: "1.5rem" }}>
                <div>
                  <BsPerson />
                </div>
              </IconContext.Provider>
              <span>People</span>
            </button>
            <button>
              <IconContext.Provider value={{ size: "1.5rem" }}>
                <div>
                  <GrLocation />
                </div>
              </IconContext.Provider>
              <span>Check in</span>
            </button>
            <button>
              <IconContext.Provider value={{ size: "1.5rem" }}>
                <div>
                  <BsEmojiSmile />
                </div>
              </IconContext.Provider>
              <span>Mood</span>
            </button>
          </div>

          <div className="shared">
            <button>Share</button>
          </div>
        </div>
      </div>

      <Post></Post>
    </div>
  );
};

export default Home;
