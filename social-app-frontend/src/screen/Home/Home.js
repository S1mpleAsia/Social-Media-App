import React, { useEffect, useRef, useState } from "react";
import Post from "../../components/post/Post";
import "./home.scss";
import { BsPerson } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import { useNavigate, useOutletContext } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import axios from "axios";

var stompClient = null;

const Home = () => {
  const navigate = useNavigate();
  const auth = sessionStorage.getItem("username");
  const [userInfo, setUserInfo] = useOutletContext();
  const [blog, setBlog] = useState({
    caption: "",
    liked: 0,
    commented: 0,
    shared: 0,
    blogImageList: [],
    commentList: [],
    user: null,
  });

  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    if (!auth) navigate("/login");
    else {
      (async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/v1/blog");

          setBlogList([...blogList, ...res.data]);
        } catch (error) {
          console.log(error);
        }
      })();

      connect();
    }
  }, []);

  useEffect(() => {
    setBlog({ ...blog, user: userInfo });
  }, [userInfo]);

  useEffect(() => {
    console.log(blogList);
  }, []);

  const connect = () => {
    var socket = new SockJS("http://localhost:8080/ws");
    stompClient = over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe("/group/public-blog", onPublicBlog);
    stompClient.subscribe("/group/public-comment", onPublicComment);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onPublicBlog = (payload) => {
    const payloadData = JSON.parse(payload.body);

    setBlogList((prev) => [...prev, payloadData]);
  };

  const onPublicComment = (payload) => {
    const payloadData = JSON.parse(payload.body);
  };

  const postBlog = () => {
    const myblog = { ...blog };

    setBlog({ ...blog, blogImageList: [], caption: "" });
    stompClient.send("/app/user-blog", {}, JSON.stringify(myblog));
  };

  const postComment = () => {
    const data = {};

    stompClient.send("/app/user-comment", {}, JSON.stringify(blog));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Ok");
      postComment();
    }
  };

  function handleFileUpload(file) {
    console.log(file);
    if (file.type === "image/png" || file.type === "image/jpeg") {
      const formData = new FormData();
      formData.append("file", file);

      (async () => {
        try {
          const res = await axios.put(
            "http://localhost:8080/api/v1/blog-image/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          setBlog((prevBlog) => ({
            ...prevBlog,
            blogImageList: [
              ...prevBlog.blogImageList,
              { imageUrl: "http://localhost:8080/uploads/" + file.name },
            ],
          }));
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }

  const handleUploadBlogImg = (e) => {
    if (e.target.files) {
      [...e.target.files].map((file) => handleFileUpload(file));
    }
  };

  return (
    <div className="homepage">
      <div className="top-bar">
        <div className="status-bar">
          <div>
            <img src={userInfo.imageUrl} alt="" />
          </div>

          <textarea
            placeholder={`Whats on your wing, ${userInfo.fullname || auth}?`}
            value={blog.caption}
            onChange={(e) => setBlog({ ...blog, caption: e.target.value })}
          ></textarea>
        </div>

        <div className="image-grid">
          {blog.blogImageList.map((image) => (
            <div className="image">
              <img src={image.imageUrl} alt="" />
            </div>
          ))}

          {/* <div className="image">
            <img
              src="https://images.unsplash.com/photo-1682222925217-40650cf10cdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </div> */}
        </div>

        <div className="group-btn">
          <div className="group-emotion">
            <label>
              <IconContext.Provider value={{ size: "1.5rem" }}>
                <div>
                  <BsPerson />
                </div>
              </IconContext.Provider>
              <span>People</span>
            </label>
            <label>
              <IconContext.Provider value={{ size: "1.5rem" }}>
                <div>
                  <GrLocation />
                </div>
              </IconContext.Provider>
              <span>Check in</span>
            </label>
            <label>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleUploadBlogImg}
                multiple
              />
              <IconContext.Provider value={{ size: "1.5rem" }}>
                <div>
                  <IoImageOutline />
                </div>
              </IconContext.Provider>
              <span>Photos</span>
            </label>
          </div>

          <div className="shared">
            <button onClick={postBlog}>Share</button>
          </div>
        </div>
      </div>

      {blogList?.map((blog, index) => (
        <Post
          handleKeyDown={handleKeyDown}
          blog={blog}
          user={userInfo}
          key={index}
        ></Post>
      ))}
      <Post handleKeyDown={handleKeyDown}></Post>
    </div>
  );
};

export default Home;
