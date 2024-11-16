import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Avatar from "../components/Avatar";
const CheckEmailPage = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    try {
      const res = await axios.post("/api/email", formData);
      if (res.data.success) {
        // userId'yi localStorage'a kaydet
        localStorage.setItem("userId", res.data.data._id);
        toast.success(res.data.message);
  
        // Kullanıcıyı password sayfasına yönlendir
        navigate("/password", {
          state: res.data.data,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };
  

  return (
    <div className="email flex items-center justify-center h-screen overflow-x-hidden">
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
          Email <span className="text-[#022833] ml-2">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="label p-2 text-white">
              Email:
            </label>
            <input
              value={formData.email}
              onChange={handleOnChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="email"
              className="cursor-pointer w-full pl-2 text-black input input-bordered h-10 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0 focus:bg-opacity-50 focus:border-[#3db8da] focus:ring-2 focus:ring-[#3db8da] transition-all duration-300 rounded-lg"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="btn border-none rounded-lg text-lg text-white w-full h-12 transition-all bg-[#055d77] hover:bg-[#02242e]"
            >
              Let's Go
            </button>
          </div>
        </form>

        <p className="mt-2 text-sm flex justify-center items-center text-white">
          Enter your
          <Link
            to="/register"
            className="hover:underline hover:text-[#3db8da] hover:font-semibold hover:text-lg ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
