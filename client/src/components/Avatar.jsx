import React from "react";
import { LuUserCircle2 } from "react-icons/lu";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  let avatarName = "";

  if (name) {
    const splitName = name.split(" ");
    avatarName = splitName.length > 1 ? splitName[0][0] + splitName[1][0] : splitName[0][0];
  }

  const bgColor = [
    'bg-indigo-300',  // Pastel mavi-mor tonu
    'bg-purple-300',  // Pastel mor tonu
    'bg-pink-200',    // Pastel pembe tonu
    'bg-pink-300',    // Daha yoğun pastel pembe tonu
    'bg-purple-200',  // Açık pastel mor tonu
    'bg-fuchsia-200', // Pastel fuşya (mor-pembe karışımı) tonu
    'bg-fuchsia-300', // Pastel fuşya (mor-pembe karışımı) tonu
    'bg-fuchsia-400', // Pastel fuşya (mor-pembe karışımı) tonu
    'bg-indigo-400',  // Yoğun pastel mavi-mor tonu
    'bg-indigo-500',  // Orta koyulukta indigo tonu
    'bg-indigo-600',  // Daha koyu indigo tonu
    'bg-indigo-700',  // Daha koyu indigo tonu
    'bg-indigo-800',  // Daha koyu indigo tonu
    'bg-rose-200',    // Pastel gül pembesi tonu
    'bg-violet-300',  // Pastel menekşe tonu
    'bg-violet-400',  // Pastel menekşe tonu
    'bg-violet-500',  // Pastel menekşe tonu
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
        <div className="flex items-center justify-center text-white bg-transparent  rounded-full" style={{ width: `${width}px`, height: `${height}px` }}>
          <LuUserCircle2 className="text-8xl text-[#f1f4f5]" size={width} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
