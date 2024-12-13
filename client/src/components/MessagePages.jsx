import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft, FaImage, FaPlus, FaVideo } from "react-icons/fa";
import uploadFile from "../helpers/uploadFile";
import { IoClose, IoSend } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpiner";
import moment from "moment";

const MessagePages = () => {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );

  const user = useSelector((state) => state?.user);

  const [dataUser, setDataUser] = useState({
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    online: false,
  });
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const [onlineUser, setOnlineUser] = useState(new Set());
  const currentMessage = useRef(null);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allMessage]);

  const handleUploadImageVideo = (e) => {
    e.preventDefault();
    setOpenImageVideoUpload((prev) => !prev);
  };

  const handelImage = async (e) => {
    const file = e.target.files[0];
    try {
      setLoading(true);
      const uploadPhoto = await uploadFile(file);

      if (!uploadPhoto?.url) {
        throw new Error("Yükleme başarısız oldu.");
      }

      setMessage((prev) => ({
        ...prev,
        imageUrl: uploadPhoto.url,
      }));
    } catch (error) {
      console.error("Dosya yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
      setOpenImageVideoUpload(false);
    }
  };

  const handleClearUploadImage = () => {
    setMessage((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleVideo = async (e) => {
    const file = e.target.files[0];
    try {
      setLoading(true);
      const uploadPhoto = await uploadFile(file);

      if (!uploadPhoto?.url) {
        throw new Error("Yükleme başarısız oldu.");
      }

      setMessage((prev) => ({
        ...prev,
        videoUrl: uploadPhoto.url,
      }));
    } catch (error) {
      console.error("Dosya yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
      setOpenImageVideoUpload(false);
    }
  };

  const handleClearUploadVideo = () => {
    setMessage((prev) => ({
      ...prev,
      videoUrl: "",
    }));
  };

  useEffect(() => {
    console.log("Socket connection:", socketConnection);

    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);
      // Backend'e bağlandığını kontrol edebilirsiniz
      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });

      // Backend'den bir mesaj gelirse
      socketConnection.on("message", (data) => {
        console.log("Received messages:", data);
        setAllMessage(data);
      });
    }
  }, [socketConnection, params?.userId, user]);

  const handleSendMessageInput = (e) => {
    const { name, value } = e.target;

    setMessage((preve) => {
      return {
        ...preve,
        text: value,
      };
    });
  };

  const handleMessageSend = (e) => {
    e.preventDefault();

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        const payload = {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id,
        };

        console.log("Payload to emit:", payload); // Loglayarak kontrol edin
        socketConnection.emit("new-message", payload);

        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: "",
        });
      }
    }
  };

  return (
    <div>
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
            <h3 className="font-semibold text-xl text-primary">
              {dataUser?.name}
            </h3>
            <p className="-mt-2 text-sm">
              {dataUser?.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-500">offline</span>
              )}
            </p>
          </div>
        </div>
        <HiDotsVertical className="cursor-pointer text-xl" />
      </header>

      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-purple-400 bg-opacity-10'>
      {/** All messages displayed here */}
      <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
        {allMessage.map((msg, index) => (
          <div
            key={index}
            className={`p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
              user._id === msg?.msgByUserId ? "ml-auto bg-purple-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            <div className='w-full relative'>
              {msg?.imageUrl && (
                <img
                  src={msg?.imageUrl}
                  className='w-full h-full object-scale-down'
                  alt='messageImage'
                />
              )}
              {msg?.videoUrl && (
                <video
                  src={msg.videoUrl}
                  className='w-full h-full object-scale-down'
                  controls
                />
              )}
            </div>
            <p className='px-2'>{msg.text}</p>
            <p className='text-xs ml-auto w-fit'>
              {moment(msg.createdAt).format('hh:mm')}
            </p>
          </div>
        ))}
      </div>

      {/** Uploaded Image Display */}
      {message.imageUrl && (
        <div className='w-full h-full sticky bottom-0 bg-purple-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
          <div
            className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600'
            onClick={handleClearUploadImage}
          >
            <IoClose size={30} />
          </div>
          <div className='bg-white p-3'>
            <img
              src={message.imageUrl}
              alt='uploadImage'
              className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
            />
          </div>
        </div>
      )}

      {/** Uploaded Video Display */}
      {message.videoUrl && (
        <div className='w-full h-full sticky bottom-0 bg-purple-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
          <div
            className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600'
            onClick={handleClearUploadVideo}
          >
            <IoClose size={30} />
          </div>
          <div className='bg-white p-3'>
            <video
              src={message.videoUrl}
              className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
              controls
              muted
              autoPlay
            />
          </div>
        </div>
      )}

      {loading && (
        <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
          <LoadingSpinner />
        </div>
      )}
    </section>

      <section className="h-16 bg-white flex items-center px-3">
        <div className="relative">
          <button
            onClick={handleUploadImageVideo}
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary transition-all hover:text-white"
          >
            <FaPlus size={20} />
          </button>

          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 gap-3 px-3 cursor-pointer hover:bg-slate-200"
                >
                  <FaImage size={18} className="text-secondary" />
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 gap-3 px-3 cursor-pointer hover:bg-slate-200"
                >
                  <FaVideo size={18} className="text-primary" />
                  <p>Video</p>
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handelImage}
                />
                <input
                  type="file"
                  id="uploadVideo"
                  className="hidden"
                  accept="video/*"
                  onChange={handleVideo}
                />
              </form>
            </div>
          )}
        </div>

        <form
          className="flex-grow ml-4 flex gap-2 items-center relative justify-end"
          onSubmit={handleMessageSend}
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full h-10 px-4 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={message.text}
            onChange={handleSendMessageInput}
          />
          <button
            type="submit"
            className="p-3 text-purple-500 hover:text-purple-700 absolute"
          >
            <IoSend size={24} />
          </button>
        </form>
      </section>
    </div>
  );
};

export default MessagePages;
