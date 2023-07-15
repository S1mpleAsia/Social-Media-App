import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screen/Home/Home";
import Profile from "./screen/Profile/Profile";
import Notification from "./screen/Notifications/Notification";
import Layout from "./layout/Layout";
import Login from "./screen/Login/Login";
import Saved from "./screen/Saved/Saved";
import MessagesLayout from "./layout/MessagesLayout";
import Photo from "./components/profile/Photo";
import Post from "./components/post/Post";
import About from "./components/profile/About";
import Friend from "./components/profile/Friend";
import Signup from "./screen/Login/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "photos",
            element: <Photo />,
          },

          {
            path: "posts",
            element: <Post />,
          },

          {
            path: "about",
            element: <About />,
          },

          {
            path: "friends",
            element: <Friend />,
          },
        ],
      },

      {
        path: "/notification",
        element: <Notification />,
      },

      {
        path: "/saved",
        element: <Saved />,
      },
    ],
  },

  {
    path: "/messages",
    element: <MessagesLayout />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Signup />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
