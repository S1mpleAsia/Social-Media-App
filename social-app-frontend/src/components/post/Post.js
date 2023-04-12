import React from "react";
import "./post.scss";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { IoShareSocialOutline, IoImageOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";

const Post = () => {
  return (
    <div className="post">
      <div className="header">
        <div className="avatar">
          <Link to="profile">
            <img
              src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/340102593_1671418876634272_7202750476793864828_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=EIEUFw6ve7YAX_0vwcV&_nc_ht=scontent.fhan14-3.fna&oh=00_AfANUZqjlQ5lNkefCwL8NTINdAKo5M7L8uSKsoOr2QN3og&oe=6437AE5Fhttps://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/340102593_1671418876634272_7202750476793864828_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=EIEUFw6ve7YAX_0vwcV&_nc_ht=scontent.fhan14-3.fna&oh=00_AfANUZqjlQ5lNkefCwL8NTINdAKo5M7L8uSKsoOr2QN3og&oe=6437AE5F"
              alt=""
            />
          </Link>
        </div>

        <div className="status">
          <p className="info">
            <Link to="/profile">John Due</Link>
            <span> shared a posts</span>
          </p>

          <p className="date">2 hours ago</p>
        </div>

        <div className="action">
          <button>
            <IconContext.Provider
              value={{ size: "1.4rem", color: "var(--gray-color)" }}
            >
              <div>
                <FiMoreHorizontal />
              </div>
            </IconContext.Provider>
          </button>
        </div>
      </div>

      <div className="caption">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officiis
          animi quos accusamus eaque repellat vero impedit ea earum molestias,
          ad, optio placeat qui natus porro perferendis odit facere deserunt.
        </p>
      </div>

      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1680868354675-34192a9baae7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>

      <div className="group-btn">
        <button>
          <AiOutlineHeart />
          <span>72</span>
        </button>
        <button>
          <BiComment />
          <span>11</span>
        </button>
        <button>
          <IoShareSocialOutline />
          <span>4</span>
        </button>
      </div>

      <div className="cmt-bar">
        <div className="avatar">
          <img
            src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/340102593_1671418876634272_7202750476793864828_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=EIEUFw6ve7YAX_0vwcV&_nc_ht=scontent.fhan14-3.fna&oh=00_AfANUZqjlQ5lNkefCwL8NTINdAKo5M7L8uSKsoOr2QN3og&oe=6437AE5Fhttps://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/340102593_1671418876634272_7202750476793864828_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=EIEUFw6ve7YAX_0vwcV&_nc_ht=scontent.fhan14-3.fna&oh=00_AfANUZqjlQ5lNkefCwL8NTINdAKo5M7L8uSKsoOr2QN3og&oe=6437AE5F"
            alt=""
          />
        </div>

        <div className="cmt-field">
          <textarea placeholder="Leave a comment"></textarea>
          <button>
            <IoImageOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
