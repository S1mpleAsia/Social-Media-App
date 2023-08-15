import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpMode, setSignUpMode] = useState(false);

  const handleSignInMode = () => {
    setSignUpMode(!signUpMode);
  };

  const handleSignUpMode = () => {
    setSignUpMode(!signUpMode);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8080/api/v1/login", {
        params: {
          email: email,
          password: password,
        },
      })
      .then(function (res) {
        const data = res.data;
        console.log(data);
        if (data !== "") {
          sessionStorage.setItem("username", data.username);
          navigate("/");
        } else {
          notification.error({
            message: "Login Failed!",
            description: "Username or Password incorrect",
            placement: "top",
            duration: 1,
          });
        }
      })
      .catch(function (err) {
        console.log("Error");
        console.log(err);
      });
    // sessionStorage.setItem("username", username);
    // navigate("/");
  };

  return (
    <div className="auth-app">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>

        <div className="formInput">
          <label>Email</label>
          <input
            value={email}
            type="email"
            id="email"
            placeholder="Your email"
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

        <button>Login</button>

        <div
          className="link-btn"
          onClick={() => {
            navigate("/register");
          }}
        >
          Don't have an account
        </div>
      </form>

      {/* <div className={`login-container ${signUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="" className="sign-in-form">
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn solid login-btn"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </button>

            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>

          <form action="" className="sign-up-form">
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Sign Up" className="btn solid" />

            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              minus natus est.
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={handleSignUpMode}
            >
              Sign Up
            </button>
          </div>
          <img src="./log.svg" className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              minus natus est.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={handleSignInMode}
            >
              Sign In
            </button>
          </div>
          <img src="./register.svg" className="image" alt="" />
        </div>
      </div>
    </div> */}
    </div>
  );
};

export default Login;
