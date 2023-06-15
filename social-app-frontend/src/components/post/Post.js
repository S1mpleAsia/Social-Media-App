import React, { useEffect } from "react";
import "./post.scss";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { IoShareSocialOutline, IoImageOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";

const Post = ({ handleKeyDown, blog, user }) => {
  useEffect(() => {
    console.log(blog);
  }, []);

  return (
    <div className="post">
      <div className="header">
        <div className="avatar">
          <Link to="profile/posts">
            <img src={blog?.user?.imageUrl} alt="" />
          </Link>
        </div>

        <div className="status">
          <p className="info">
            <Link to="/profile/posts">{blog?.user?.fullname}</Link>
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
        <p>{blog?.caption}</p>
      </div>

      {blog?.blogImageList.map((image, index) => (
        <div className="image" key={index}>
          <img src={image.imageUrl} alt="" />
        </div>
      ))}

      <div className="group-btn">
        <button>
          <AiOutlineHeart />
          <span>{blog?.liked}</span>
        </button>
        <button>
          <BiComment />
          <span>{blog?.commented}</span>
        </button>
        <button>
          <IoShareSocialOutline />
          <span>{blog?.shared}</span>
        </button>
      </div>

      <div className="cmt-bar">
        <div className="avatar">
          <img src={user?.imageUrl} alt="" />
        </div>

        <div className="cmt-field">
          <input
            type="text"
            placeholder="Leave a comment"
            onKeyDown={handleKeyDown}
          ></input>

          <button>
            <label>
              <input type="file" style={{ display: "none" }} />
              <IoImageOutline />
            </label>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
