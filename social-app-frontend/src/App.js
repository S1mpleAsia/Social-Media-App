import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screen/Home/Home";
import Profile from "./screen/Profile/Profile";
import Notification from "./screen/Notifications/Notification";
import Layout from "./layout/Layout";
import Login from "./screen/Login/Login";
import Saved from "./screen/Saved/Saved";
import Messages from "./screen/Messages/Messages";
import MessagesLayout from "./layout/MessagesLayout";

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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
