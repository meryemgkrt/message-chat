import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout, setOnlineUser, setSocketConnection } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import logo from "../img/lg1.webp";
import io from "socket.io-client";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const socketRef = useRef(null);

  console.log("User", user);
  const fetchUser = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;

      const response = await axios.get(URL, {
        withCredentials: true,
      });

      const userData = response?.data?.data;

      if (userData) {
        dispatch(setUser(userData));

        if (userData.logout) {
          dispatch(logout());
          navigate("/email");
        }

        console.log("User data fetched", userData);
      } else {
        console.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Fetch user error", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

 //socket connection
 useEffect(() => {
  const socketConnection = io(import.meta.env.VITE_BACKEND_URL, {
    auth: {
      token: localStorage.getItem("token"),
    },
  });

  socketConnection.on("onlineUser", (data) => {
    console.log("online user", data);
    dispatch(setOnlineUser(data));
  });

  dispatch(setSocketConnection(socketConnection));

  return () => {
    socketConnection.disconnect();
  };
}, []);


  const basePath = location.pathname === "/";

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen home">
      <section className={`bg-bg home ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/**message component**/}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center backdrop-blur-md bg-white/30 items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img src={logo} width={250} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
};

export default Home;
