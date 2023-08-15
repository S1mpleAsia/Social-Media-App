import React from "react";
import { Modal } from "antd";
import { IconContext } from "react-icons";
import { IoImageOutline } from "react-icons/io5";
import axios from "axios";
import "./EditModal.scss";

const EditModal = ({
  isModalOpen,
  setIsModalOpen,
  blog,
  blogList,
  setBlogList,
  stompClient,
}) => {
  const handleOk = (blog_id) => {
    setIsModalOpen(false);

    const data = blogList.filter((blog) => blog.id === blog_id);
    console.log(data[0]);

    stompClient.send("/app/user-blog", {}, JSON.stringify(data[0]));

    (async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/blog");

        console.log(res);
        setBlogList([...blogList, ...res.data]);
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleFileUpload(file, type, blog_id) {
    console.log(blog_id);
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

          if (type == "blog") {
            console.log("In edit blog");
            setBlogList((prevList) =>
              prevList.map((blog) =>
                blog.id === blog_id
                  ? {
                      ...blog,
                      blogImageList: [
                        ...blog.blogImageList,
                        {
                          imageUrl:
                            "http://localhost:8080/uploads/" + file.name,
                        },
                      ],
                    }
                  : blog
              )
            );
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }

  const handleUploadImg = (e, type, blog_id) => {
    console.log(e.target.files);
    if (e.target.files) {
      [...e.target.files].map((file) => handleFileUpload(file, type, blog_id));
    }
  };

  const handleCaption = (caption, blog_id) => {
    setBlogList((blogList) =>
      blogList.map((blog) =>
        blog.id === blog_id ? { ...blog, caption: caption } : blog
      )
    );
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa bài viết"
        open={isModalOpen}
        onOk={() => handleOk(blog?.id)}
        onCancel={handleCancel}
        className="edit-modal"
      >
        <textarea
          type="text"
          name="captiom"
          className="caption"
          value={blog?.caption}
          onChange={(e) => handleCaption(e.target.value, blog?.id)}
        />

        <label>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleUploadImg(e, "blog", blog?.id)}
            multiple
          />
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <div>
              <IoImageOutline />
            </div>
          </IconContext.Provider>
          <span>Photos</span>
        </label>

        <div className="image-grid">
          {blog?.blogImageList?.map((image) => (
            <div className="image">
              <img src={image.imageUrl} alt="" />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default EditModal;
