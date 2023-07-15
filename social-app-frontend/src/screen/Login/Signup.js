import axios from "axios";
import React, { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:8080/api/v1/register", {
        email: email,
        username: userName,
        password: password,
        user: {
          fullname: fullName,
        },
        role: {
          id: 1,
        },
      });

      if (data.status === 200) {
        notification.success({
          message: "Register",
          description: "Success",
          placement: "top",
          duration: 1,
        });

        navigate("/login");
        // props.onFormSwitch('login')
      }
    } catch (error) {
      notification.error({
        message: "Register",
        description: "User already exist",
        placement: "top",
        duration: 1,
      });
    }
  };

  return (
    <div className="auth-app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        <div className="formInput">
          <label>Username</label>
          <input
            value={userName}
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            id="username"
            placeholder="Username"
          />
        </div>

        <div className="formInput">
          <label>Fullname</label>
          <input
            value={fullName}
            name="fullname"
            onChange={(e) => setFullName(e.target.value)}
            id="fullname"
            placeholder="Full Name"
          />
        </div>

        <div className="formInput">
          <label>Email</label>
          <input
            value={email}
            type="email"
            id="email"
            placeholder="example@gmail.com"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formInput">
          <label>Password</label>
          <input
            value={password}
            type="password"
            id="password"
            placeholder="Your password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button>Register</button>

        <div className="link-btn" onClick={() => navigate("/login")}>
          Already have an account? Login here.
        </div>
      </form>
    </div>
  );
};

export default Signup;
