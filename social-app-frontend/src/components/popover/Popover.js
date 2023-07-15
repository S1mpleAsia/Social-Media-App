import React from "react";
import "./Popover.scss";
import { IconContext } from "react-icons";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const Popover = ({
  active,
  handleRemovePost,
  isModalOpen,
  setIsModalOpen,
  blog,
}) => {
  return (
    <div className={`pop-container ${active ? "active" : ""}`}>
      <div className="wrapper">
        <div className="item" onClick={() => setIsModalOpen(!isModalOpen)}>
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <div className="image">
              <FiEdit />
            </div>
          </IconContext.Provider>

          <div className="content">Chỉnh sửa</div>
        </div>

        <div className="item" onClick={() => handleRemovePost(blog?.id)}>
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <div className="image">
              <MdOutlineDelete />
            </div>
          </IconContext.Provider>

          <div className="content">Xoá bài viết</div>
        </div>
      </div>
    </div>
  );
};

export default Popover;
