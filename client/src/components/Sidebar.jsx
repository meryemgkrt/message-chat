import { MdOutlineHome, MdOutlineSettings } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { BiBell } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditUserDetails from "./EditUserDetails";
import SearcEdit from "./SearcEdit";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className="w-full h-full grid grid-cols-[60px,1fr] bg-purple-200 relative">
      {/* Sidebar */}
      <div className="bg-purple-600 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between items-center">
        {/* Icons Section */}
        <div className="flex flex-col items-center gap-4">
          <NavLink
            to="/home"
            title="Home"
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer rounded-full ${
                isActive
                  ? "bg-purple-800 text-black"
                  : "bg-transparent text-white hover:bg-purple-700 hover:text-black"
              }`
            }
          >
            <MdOutlineHome size={24} />
          </NavLink>
          <button
            title="Add User"
            onClick={() => setOpenSearch(true)}
            className="w-12 h-12 flex justify-center items-center cursor-pointer rounded-full bg-transparent text-white hover:bg-purple-700 hover:text-black"
          >
            <FaUserPlus size={24} />
          </button>

          <NavLink
            to="/chat"
            title="Chat"
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer rounded-full ${
                isActive
                  ? "bg-purple-800 text-black"
                  : "bg-transparent text-white hover:bg-purple-700 hover:text-black"
              }`
            }
          >
            <IoChatbubbleEllipsesSharp size={24} />
          </NavLink>
          <NavLink
            to="/notifications"
            title="Notifications"
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer rounded-full ${
                isActive
                  ? "bg-purple-800 text-black"
                  : "bg-transparent text-white hover:bg-purple-700 hover:text-black"
              }`
            }
          >
            <BiBell size={24} />
          </NavLink>
          <NavLink
            to="/settings"
            title="Settings"
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer rounded-full ${
                isActive
                  ? "bg-purple-800 text-black"
                  : "bg-transparent text-white hover:bg-purple-700 hover:text-black"
              }`
            }
          >
            <MdOutlineSettings size={24} />
          </NavLink>
        </div>

        {/* Profile and Logout Section */}
        <div className="flex flex-col items-center gap-4">
          <button
            className="w-12 h-12 flex justify-center items-center cursor-pointer rounded-full bg-transparent text-white hover:bg-purple-700 hover:text-black"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
              className="rounded-full"
            />
          </button>
          <button
            title="Logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer rounded-full bg-transparent text-white hover:bg-purple-700 hover:text-black"
            onClick={handleLogout}
          >
            <TbLogout2 size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <div className="h-16 flex items-center bg-purple-400">
          <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2>
        </div>
        <div className="bg-purple-100 p-[0.5px]"></div>
        <div className="h-[calc(100vh-65px)] overflow-y-auto p-4">
          {/* Main content or user list can go here */}
        </div>
      </div>

      {/* Search User */}
      {openSearch && (
        <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center">
          <SearcEdit onClose={() => setOpenSearch(false)} />
        </div>
      )}

      {/* Edit User Details */}
      {editUserOpen && (
        <div className="absolute top-0 left-0 w-full h-full z-40">
          <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
