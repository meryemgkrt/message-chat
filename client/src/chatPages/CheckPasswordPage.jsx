import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";
const CheckPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    userId: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const disparch= useDispatch();

  console.log("location", location.state);

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

  // Form verilerindeki değişiklikleri yakala
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form gönderimini yönet
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/password`;
    try {
      const res = await axios({
        method: "POST",
        url: URL,
        data: {
          password: formData.password,
          userId: location?.state?._id,
        },
        withCredentials: true,
      });
      toast.success(res.data.message || "Şifre doğrulama başarılı!");

  

      if(res.data.success){
        disparch(setToken(res?.data?.token));
       
        localStorage.setItem("token", res?.data?.token);
        setFormData({
          password: "",
        })
        navigate("/");
      }
    } catch (error) {
      console.error("Hata:", error);
      toast.error(
        error.response?.data?.message ||
          "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
    /*    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User ID bulunamadı. Lütfen tekrar giriş yapın.");
          
        return;
      }

      const res = await axios.post(URL, {
        password: formData.password,
        userId,
      });

      toast.success(res.data.message || "Şifre doğrulama başarılı!");
      setFormData({ password: "" }); // Formu temizle
      navigate("/"); // Ana sayfaya yönlendir
    } catch (error) {
      console.error("Hata:", error);
      toast.error(
        error.response?.data?.message ||
          "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    }  */
  };

  return (
    <div className="password flex items-center justify-center h-screen overflow-x-hidden">
      <div className="w-full max-w-[450px] p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0">
        <div className="flex justify-center items-center mb-3">
          {/*  <LuUserCircle2 className="text-8xl text-[#072e38] mx-auto" /> */}
          <Avatar
            className="mx-auto"
            width={90}
            height={90}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
        </div>
        <div className="mb-4">
          <h1 className="text-white font-semibold text-center justify-center items-center">
            {location?.state?.name}
          </h1>
        </div>
        <h1 className="text-3xl text-white font-semibold flex justify-center items-center mb-4">
          Password <span className="text-[#022833] ml-2">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="label p-2 text-white">
              Password:
            </label>
            <input
              value={formData.password}
              onChange={handleOnChange}
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="current-password"
              className="cursor-pointer w-full pl-2 text-black input input-bordered h-10 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0 focus:bg-opacity-50 focus:border-[#3db8da] focus:ring-2 focus:ring-[#3db8da] transition-all duration-300 rounded-lg"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="btn border-none rounded-lg text-lg text-white w-full h-12 transition-all bg-[#055d77] hover:bg-[#02242e]"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-2 text-sm flex justify-center items-center text-white">
          Go to
          <Link
            to="/forgot-password"
            className="hover:underline hover:text-[#3db8da] hover:font-semibold hover:text-lg ml-1"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
