import React, { useEffect, useRef, useState } from "react";
import "./post.scss";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { IoShareSocialOutline, IoImageOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import Popover from "../popover/Popover";
import Swal from "sweetalert2";
import EditModal from "./EditModal";
import axios from "axios";
import { notification } from "antd";

const Post = ({
  handleKeyDown,
  blog,
  user,
  comment,
  setComment,
  handleUploadImg,
  blogList,
  setBlogList,
  stompClient,
}) => {
  const commentRef = useRef();
  const [popActive, setPopActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(blog);
    console.log(user);
  }, []);

  useEffect(() => {
    commentRef.current.value = "";
  }, [blogList]);

  const handleRemoveImg = (comment, image_url) => {
    console.log("Comment " + { ...comment });
    console.log("ImageURL " + image_url);
  };

  const handleRemovePost = (blog_id, blog) => {
    if (user.id !== blog.user.id) {
      notification.error({
        message: "Remove fail",
        description: "You don't have permission to delete this post",
        placement: "top",
        duration: 1,
      });

      return;
    }
    setPopActive(!popActive);
    console.log(blog_id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:8080/api/v1/blog/" + blog_id)
          .then(() => {
            setBlogList(blogList.filter((blog) => blog?.id !== blog_id));
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          });
      }
    });
  };

  return (
    <div className="post">
      <div className="header">
        <div className="avatar">
          <Link to="profile/posts">
            <img
              src={
                blog?.user?.imageUrl ||
                "http://localhost:3000/images/Ice_Bear.jpg"
              }
              alt=""
            />
          </Link>
        </div>

        <div className="status">
          <p className="info">
            <Link to="/profile/posts">
              {blog?.user?.fullname || "Anonymous user"}
            </Link>
            <span> shared a posts</span>
          </p>

          <p className="date">2 hours ago</p>
        </div>

        <div className="action">
          <button onClick={() => setPopActive(!popActive)}>
            <IconContext.Provider
              value={{ size: "1.4rem", color: "var(--gray-color)" }}
            >
              <div>
                <FiMoreHorizontal />
              </div>
            </IconContext.Provider>
          </button>

          <Popover
            active={popActive}
            handleRemovePost={handleRemovePost}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            blog={blog}
            user={user}
          ></Popover>

          <EditModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            blog={blog}
            blogList={blogList}
            setBlogList={setBlogList}
            stompClient={stompClient}
          ></EditModal>
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
            ref={commentRef}
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setComment({ ...comment, content: e.target.value })
            }
          ></input>

          <button>
            <label>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleUploadImg(e, "comment", blog?.id)}
                multiple
              />
              <IoImageOutline />
            </label>
          </button>
        </div>
      </div>

      <div className="group-image">
        {blog?.id === comment?.blogId &&
          comment?.commentImageList?.map((image) => (
            <div className="image">
              <img src={image.imageUrl} alt="" />

              <IconContext.Provider value={{ size: "1.5rem", color: "#ccc" }}>
                <div onClick={() => handleRemoveImg(comment, image.imageUrl)}>
                  <IoMdCloseCircle />
                </div>
              </IconContext.Provider>
            </div>
          ))}
      </div>

      <div className="group-comment">
        {blog?.commentList?.map((comment) => (
          <div className="outer-wrapper">
            <div className="comment-wrapper">
              <div className="cmt-avatar">
                <img
                  src={
                    comment?.commentUser?.imageUrl ||
                    "http://localhost:3000/images/Ice_Bear.jpg"
                  }
                  alt=""
                />
              </div>

              <div className="user-wrapper">
                <h4 className="cmt-name">
                  {comment?.commentUser?.fullname || "Anonymous User"}
                </h4>

                <p className="content">{comment?.content}</p>
              </div>
            </div>

            {comment?.commentImageList?.map((image) => (
              <div className="cmt-image">
                <img src={image?.imageUrl} alt="" />
              </div>
            ))}
            {/* <div className="cmt-image">
              <img
                src={
                  comment?.commentUser?.imageUrl ||
                  "http://localhost:3000/images/Ice_Bear.jpg"
                }
                alt=""
              />
            </div> */}
          </div>
        ))}
        {/* <div className="comment-wrapper">
          <div className="cmt-avatar">
            <img
              src="http://localhost:8080/uploads/jake-allison-XUPlvW9sR7o-unsplash.jpg"
              alt=""
            />
          </div>

          <div className="user-wrapper">
            <h4 className="cmt-name">Duong Vu</h4>

            <p className="content">
              Rust đang nổi lên như là ngôn ngữ lập trình được yêu thích hàng
              đầu. Từ Microsoft đến Facebook đang viết lại nhiều thứ của họ bằng
              Rust thay vì dùng C/C++. Hay gần đây trong 1 Twist Elon Musk có
              nói tới sự đang lên của Rust như một ngôn ngữ rất tiềm năng.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Post;
