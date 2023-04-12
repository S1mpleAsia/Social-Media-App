import React from "react";
import Post from "../../components/post/Post";
import "./home.scss";
import { BsPerson, BsEmojiSmile } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { IconContext } from "react-icons/lib";

const Home = () => {
  return (
    <div className="homepage">
      <div className="top-bar">
        <div className="status-bar">
          <div>
            <img
              src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/340102593_1671418876634272_7202750476793864828_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=EIEUFw6ve7YAX_0vwcV&_nc_ht=scontent.fhan14-3.fna&oh=00_AfANUZqjlQ5lNkefCwL8NTINdAKo5M7L8uSKsoOr2QN3og&oe=6437AE5Fhttps://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/340102593_1671418876634272_7202750476793864828_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=EIEUFw6ve7YAX_0vwcV&_nc_ht=scontent.fhan14-3.fna&oh=00_AfANUZqjlQ5lNkefCwL8NTINdAKo5M7L8uSKsoOr2QN3og&oe=6437AE5F"
              alt=""
            />
          </div>

          <textarea placeholder="Whats on your wing, David?"></textarea>
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
