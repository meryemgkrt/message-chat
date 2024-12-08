import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);
  let avatarName = "";

  if (name) {
    const splitName = name.split(" ");
    avatarName =
      splitName.length > 1
        ? splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase()
        : splitName[0][0].toUpperCase();
  }

  const bgColor = [
    "bg-indigo-300",
    "bg-purple-300",
    "bg-pink-200",
    "bg-purple-200",
    "bg-fuchsia-300",
    "bg-indigo-400",
    "bg-rose-200",
    "bg-violet-300",
  ];

  const randomColor = Math.floor(Math.random() * bgColor.length);
  const isOnline = onlineUser?.includes(userId);

  return (
    <div
      className="relative rounded-full shadow-md flex justify-center items-center"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="rounded-full object-cover"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      ) : name ? (
        <div
          className={`${bgColor[randomColor]} flex items-center justify-center text-white font-bold rounded-full`}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {avatarName}
        </div>
      ) : (
        <div
          className="flex items-center justify-center text-white bg-gray-300 rounded-full"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <LuUserCircle2 size={width / 2} />
        </div>
      )}

      {isOnline && (
        <div
          className="bg-green-500 w-3 h-3 absolute bottom-2 -right-1 rounded-full shadow-lg"
        ></div>
      )}
    </div>
  );
};

export default Avatar;
