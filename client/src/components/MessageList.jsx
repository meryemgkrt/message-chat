import React from "react";
import moment from "moment";

const MessageList = ({ allMessage, currentMessage, user }) => {
  return (
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
  );
};

export default MessageList;
