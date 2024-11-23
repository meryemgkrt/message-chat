import axios from "axios";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import logo from "../img/lg1.webp";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;

      console.log(import.meta.env.VITE_BACKEND_URL);

      const response = await axios.get(URL, {
        withCredentials: true,
      });

      dispatch(setUser(response?.data?.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/email");
      }

      console.log("response", response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const basePath = location.pathname === "/";

  return (
    <div className="home grid lg:grid-cols-[350px,1fr] h-screen">
      {/* Sidebar */}
      <section
        className={`bg-purple-400 ${
         !basePath && "hidden"
        } w-full lg:w-auto `}
      >
        <Sidebar />
      </section>

      {/* Main Content */}
      <section className={`${basePath ? "hidden" : "block"} w-full`}>
        <Outlet />
      </section>

      {/* Default Welcome Screen */}
      
      <div className="lg:flex hidden bg-purple-300 bg-opacity-50 backdrop-blur-md flex-col justify-center items-center gap-2 p-4 text-center h-full shadow-lg rounded-lg">
  <div className="flex justify-center items-center">
    <img src={logo} alt="logo" className="w-24 h-24 md:w-40 md:h-40" />
    <h1 className="font-bold text-xl md:text-3xl text-purple-800">
      CHAT-APP
    </h1>
  </div>
  <p className="text-lg text-center font-semibold md:text-lg text-gray-600">
    Select a user to send a message
  </p>
</div>

  
    </div>
  );
};

export default Home;
