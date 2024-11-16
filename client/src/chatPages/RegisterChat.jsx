import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";
const RegisterChat = () => {
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [loading, setLoading] = useState(false); // Eksik olan loading state'i tanımlandı
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "", // Burada profile_pic kullanılıyor
  });

  const navigate =useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const uploadPhotoResponse = await uploadFile(file); // Cloudinary yükleme işlemi
      setUploadPhoto(file); // Dosya seçimini state'e kaydediyoruz
      setFormData((prev) => ({
        ...prev,
        profile_pic: uploadPhotoResponse?.url, // Yüklenen dosyanın URL'si formData'ya ekleniyor
      }));
    } catch (error) {
      console.error("Dosya yüklenirken hata oluştu:", error);
    }
  };

  const handleClearPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
    setFormData((prev) => ({
      ...prev,
      profile_pic: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/register`;

    try {
      const res = await axios.post(URL, formData);
      console.log(res);

      // Başarılı bir yanıt varsa mesajı göster
      toast.success(res.data.message);
      if(res.data.success){
        setFormData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });

        navigate("/email");
        /* setUploadPhoto(null); */
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register flex items-center justify-center h-screen overflow-x-hidden">
      <div className="w-full max-w-[450px] p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0">
        <h1 className="text-3xl text-white font-semibold flex justify-center items-center mb-4">
          Register <span className="text-[#022833] ml-2">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="label p-2 text-white">
              Name:
            </label>
            <input
              value={formData.name}
              type="text"
              id="name"
              name="name"
              placeholder="Enter Full Name"
              autoComplete="name"
              className="cursor-pointer w-full pl-2 text-black input input-bordered h-10 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0 focus:bg-opacity-50 focus:border-[#3db8da] focus:ring-2 focus:ring-[#3db8da] transition-all duration-300 rounded-lg"
              onChange={handleOnChange}
            />
          </div>
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
              className="w-full pl-2 text-black input input-bordered h-10 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0 focus:bg-opacity-50 focus:border-[#3db8da] focus:ring-2 focus:ring-[#3db8da] transition-all duration-300 rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic" className="p-2 text-white">
              Profile:
              <div className="h-14 bg-transparent flex justify-center items-center border border-[#0c272e] rounded hover:border-[#3db8da] cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto.name
                    : "Upload profile photo"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>
            <input
              onChange={handleUpload}
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="hidden"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="btn border-none rounded-lg text-lg text-white w-full h-12 transition-all bg-[#055d77] hover:bg-[#02242e]"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="mt-2 text-sm flex justify-center items-center text-white">
          Already have an account?
          <Link
            to="/login"
            className="hover:underline hover:text-[#3db8da] hover:font-semibold hover:text-lg ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterChat;
