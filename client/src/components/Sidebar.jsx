import { MdOutlineHome, MdOutlineSettings } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditUserDetails from "./EditUserDetails";
import SearcEdit from "./SearcEdit";
import MessagePages from "./MessagePages"; 
import { FiArrowUpLeft } from "react-icons/fi";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Seçilen kullanıcı durumu

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.clear();
  };

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      {/* Sidebar */}
      <div className="bg-purple-600 w-12 h-full  py-5 text-white flex flex-col justify-between">
        {/* Icons Section */}
        <div>
          <div className="flex flex-col items-center gap-2">
            <button
              className="w-12 h-12 flex justify-center items-center hover:bg-purple-700 rounded"
              title="Chat"
            >
              <IoChatbubbleEllipsesSharp size={20} />
            </button>
            <button
              onClick={() => setOpenSearchUser(true)}
              className="w-12 h-12 flex justify-center items-center hover:bg-purple-700 rounded"
              title="Add User"
            >
              <FaUserPlus size={20} />
            </button>
          </div>
        </div>

        {/* Profile and Logout Section */}
        <div className="flex flex-col items-center">
          <button
            className="w-12 h-12 flex justify-center items-center mx-auto hover:bg-purple-700 rounded"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <Avatar
              width={40}
              height={40}
              imageUrl={user?.profile_pic}
              name={user?.name}
              userId={user?._id}
            />
          </button>
          <button
            onClick={handleLogout}
            className="w-12 h-12 flex justify-center items-center hover:bg-purple-700 rounded"
            title="Logout"
          >
            <TbLogout2 size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {/* Header */}
        <div className="h-16 flex items-center bg-purple-400">
          <h2 className="text-xl font-bold p-4 text-white">Messages</h2>
        </div>
        <div className="bg-purple-100 p-[0.5px]"></div>

        {/* User List or Messages */}
        <div className="h-[calc(100vh-65px)] overflow-y-auto bg-purple-200">
          {allUser.length === 0 ? (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation with.
              </p>
            </div>
          ) : (
            allUser.map((conv, index) => (
              <div
                key={index}
                onClick={() => setSelectedUser(conv)}
                className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-purple-600 rounded hover:bg-purple-100 cursor-pointer"
              >
                <Avatar
                  imageUrl={conv?.profile_pic}
                  name={conv?.name}
                  width={40}
                  height={40}
                />
                <div>
                  <h3 className="text-ellipsis line-clamp-1 font-semibold text-base text-gray-900">
                    {conv?.name}
                  </h3>
                  <p className="text-slate-500 text-xs">
                    {conv?.lastMessage || "No messages yet"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit User Details Modal */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}

      {/* Search User Modal */}
      {openSearchUser && (
        <SearcEdit onClose={() => setOpenSearchUser(false)} />
      )}

      {/* Chat Section */}
      {selectedUser && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-40">
          <MessagePages selectedUser={selectedUser} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
