import React from "react";
import "./photo.scss";

const Photo = () => {
  return (
    <div className="photo">
      <div className="inner">
        <div className="image-grid">
          <div className="image">
            <img
              src="https://plus.unsplash.com/premium_photo-1677456381689-40beb7f4b155?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
          </div>

          <div className="image">
            <img
              src="https://plus.unsplash.com/premium_photo-1673264931454-307101fb2c31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
          </div>

          <div className="image">
            <img
              src="https://images.unsplash.com/photo-1682222925217-40650cf10cdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </div>

          <div className="image">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1682167176130-5dc0cbb20402?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photo;
