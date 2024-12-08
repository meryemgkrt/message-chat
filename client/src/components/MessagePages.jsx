import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft, FaImage, FaPlus, FaVideo } from "react-icons/fa";
import uploadFile from "../helpers/uploadFile";
import { IoClose } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpiner";

const MessagePages = () => {
  const params = useParams();
  const socketConnection = useSelector((state) => state?.user?.socketConnection);
  
  const [dataUser, setDataUser] = useState({
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    online: false,
  });

  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [message, setMessage] = useState({
    text: "", // Başlangıç değeri boş string
    imageUrl: "",
    videoUrl: "",
    see: false,
  });

  const [loading, setLoading] = useState(false);

  const handleUploadImageVideo = (e) => {
    e.preventDefault();
    setOpenImageVideoUpload((prev) => !prev);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    try {
      const uploadPhotoResponse = await uploadFile(file);
      setLoading(false);

      setMessage((prev) => ({
        ...prev,
        imageUrl: uploadPhotoResponse?.url,
      }));
    } catch (error) {
      console.error("Dosya yüklenirken hata oluştu:", error);
      setLoading(false);
    }
  };

  const handleClearUploadImage = (e) => {
    e.preventDefault();
    setMessage((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    try {
      const uploadPhotoResponse = await uploadFile(file);
      setLoading(false);

      setMessage((prev) => ({
        ...prev,
        videoUrl: uploadPhotoResponse?.url,
      }));
    } catch (error) {
      console.error("Dosya yüklenirken hata oluştu:", error);
      setLoading(false);
    }
  };

  const handleClearUploadVideo = (e) => {
    e.preventDefault();
    setMessage((prev) => ({
      ...prev,
      videoUrl: "",
    }));
  };

  const handleSendMessage = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    setMessage((prev) => ({
      ...prev,
      text: value,
    }));
  };
  

  useEffect(() => {
    if (socketConnection) {
      const userId = params?.userId;
      socketConnection.emit("message-page", userId);

      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });
    }
  }, [socketConnection, params?.userId]);

  return (
    <div className="relative">
      <header className="sticky bg-purple-400 top-0 h-16 flex justify-between items-center px-4">
        <div className="p-2 flex items-center gap-4">
          <Link to={"/"} className="text-primary lg:hidden">
            <FaAngleLeft />
          </Link>
          <div className="cursor-pointer">
            <Avatar
              width={50}
              height={50}
              name={dataUser?.name}
              imageUrl={dataUser?.profile_pic}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-xl text-primary">{dataUser?.name}</h3>
            <p className="text-sm">{dataUser?.online ? "online" : "offline"}</p>
          </div>
        </div>
        <HiDotsVertical className="cursor-pointer text-xl" />
      </header>

      <section className="h-[calc(100vh-128px)] overflow-y-scroll scrollbar">
        {message.imageUrl && (
          <div className="w-full flex justify-center items-center bg-gray-100">
            <IoClose
              size={30}
              className="absolute top-2 right-2 cursor-pointer text-red-500"
              onClick={handleClearUploadImage}
            />
            <img
              src={message.imageUrl}
              alt="Uploaded"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        )}

        {message.videoUrl && (
          <div className="w-full flex justify-center items-center bg-gray-100">
            <IoClose
              size={30}
              className="absolute top-2 right-2 cursor-pointer text-red-500"
              onClick={handleClearUploadVideo}
            />
            <video
              src={message.videoUrl}
              controls
              className="max-w-full max-h-[80vh] object-contain"
              preload="metadata"
              controlsList="nodownload"
              autoPlay
              muted
            />
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <LoadingSpinner />
          </div>
        )}
      </section>

      <section className="h-16 bg-white flex items-center px-3">
        <button
          onClick={handleUploadImageVideo}
          className="w-10 h-10 rounded-full bg-purple-500 text-white flex justify-center items-center"
        >
          <FaPlus size={20} />
        </button>

        <div className="flex-grow ml-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full h-10 px-4 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={message.text}
            onChange={handleSendMessage}
          />
        </div>
      </section>
    </div>
  );
};

export default MessagePages;
