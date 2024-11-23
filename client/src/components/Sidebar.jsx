import { MdOutlineHome, MdOutlineSettings } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { BiBell } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    // Dummy user data or real socket connection logic can go here.
    setAllUsers([]);
  }, []);

  const handleLogout = () => {
    // Add logout logic
    console.log("Logged out");
  };

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-purple-200">
      {/* Sidebar */}
      <div className="bg-purple-600 w-22 h-full rounded-tr-lg rounded-br-lg py-5 text-white flex flex-col justify-between">
        {/* Icons */}
        <div className="flex flex-col items-center">
          <NavLink
            to="/home"
            title="Home"
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-purple-700 rounded-full ${
                isActive ? "bg-purple-800" : ""
              }`
            }
          >
            <MdOutlineHome size={20} />
          </NavLink>

          <NavLink
            to="/add-user"
            title="Add User"
            onClick={()=>setOpenSearch(true)}
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-purple-700 rounded-full ${
                isActive ? "bg-purple-800" : ""
              }`
            }
          >
            <FaUserPlus size={20} />
          </NavLink>

          <NavLink
            to="/chat"
            title="Chat"
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-purple-700 rounded-full ${
                isActive ? "bg-purple-800" : ""
              }`
            }
          >
            <IoChatbubbleEllipsesSharp size={20} />
          </NavLink>

          <NavLink
            to="/notifications"
            title="Notifications"
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-purple-700 rounded-full ${
                isActive ? "bg-purple-800" : ""
              }`
            }
          >
            <BiBell size={20} />
          </NavLink>

          <NavLink
            to="/settings"
            title="Settings"
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-purple-700 rounded-full ${
                isActive ? "bg-purple-800" : ""
              }`
            }
          >
            <MdOutlineSettings size={20} />
          </NavLink>
        </div>

        {/* Profile and Logout */}
        <div className="flex flex-col items-center gap-4">
          <button
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-purple-700 rounded-full"
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
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-purple-700 rounded-full"
            onClick={handleLogout}
          >
            <TbLogout2 size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mt-2">
        <div className="h-16 flex items-center bg-purple-400">
          <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2>
        </div>
        <div className="bg-purple-100 p-[0.5px]"></div>
        <div className="h-[calc(100vh-65px)] overflow-y-auto p-4 scrollbar">
          {allUsers.length === 0 ? (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation withhh.
              </p>
            </div>
          ) : (
            <div>Main content goes here.</div>
          )}
        </div>
      </div>

      {/* Edit User Details */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}

      {/* Search User */}
      {
        openSearch && (
          <SearcEdit  onClose={()=>setEditUserOpen(false)} />
        )
      }
    </div>
  );
};

export default Sidebar;
