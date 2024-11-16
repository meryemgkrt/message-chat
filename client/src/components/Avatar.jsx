import React from "react";
import { LuUserCircle2 } from "react-icons/lu";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  let avatarName = "";

  if (name) {
    const splitName = name.split(" ");
    avatarName = splitName.length > 1 ? splitName[0][0] + splitName[1][0] : splitName[0][0];
  }

  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-gray-200',
    'bg-cyan-200',
    'bg-sky-200',
    'bg-blue-200',
    'bg-purple-200', 
    'bg-indigo-200', 
    'bg-pink-200', 
    'bg-orange-200', 
    'bg-lime-200', 
    'bg-amber-200', 
    'bg-rose-200', 
    'bg-violet-200', 
    'bg-fuchsia-200' ,

  ];

    const randomColor = Math.floor(Math.random() * 5)
  console.log("randomColor", randomColor);

  return (
    <div className={`shadow-md border-none text-xl font-bold text-slate-800 rounded-full flex justify-center items-center overflow-hidden`} style={{ width: `${width}px`, height: `${height}px` }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          width={width}
          height={height}
          className="rounded-full overflow-hidden"
        />
      ) : name ? (
        <div className={`${bgColor[randomColor]}  flex items-center justify-center text-white bg-[#183f49a4] rounded-full`} style={{ width: `${width}px`, height: `${height}px` }}>
          {avatarName}
        </div>
      ) : (
        <div className="flex items-center justify-center text-white bg-gray-400 rounded-full" style={{ width: `${width}px`, height: `${height}px` }}>
          <LuUserCircle2 className="text-8xl text-[#072e38]" size={width} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
