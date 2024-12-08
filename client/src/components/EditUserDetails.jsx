import React, { memo, useEffect, useRef, useState } from "react";
import Avatar from "../components/Avatar";
import Divider from "./Divider";
import uploadFile from "../helpers/uploadFile"; // Dosya yükleme fonksiyonu
import axios from "axios";
import taost from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const EditUserDetails = ({ onClose, user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    profile_pic: user?.profile_pic || "",
  });
  const uploaPhotoRef = useRef();
  const dispatch = useDispatch();

 
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        ...user,
      }));
    }
  }, [user]);

  // Form input'larında değişiklikleri güncelle
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

    // Fotoğraf yükleme alanını aç
    const handeOpenUploadPhoto = (e) => {
      e.preventDefault();
      e.stopPropagation()
      uploaPhotoRef.current.click();
    };



  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)

    setFormData((preve)=>{
    return{
        ...preve,
        profile_pic : uploadPhoto?.url
    }
    })
}
  

  // Formu gönder ve API'ye verileri gönder
  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()
    try {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/api/update-user`

        const response = await axios({
            method : 'post',
            url : URL,
            data : formData,
            withCredentials : true
        })

        console.log('response',response)
        taost.success(response?.data?.message)
        
        if(response.data.success){
            dispatch(setUser(response.data.data))
            onClose()
        }
     
    } catch (error) {
        console.log(error)
        taost.error()
    }
}
  
  

  return (
    <div className="fixed inset-0 bg-purple-400 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white py-6 px-4 m-1 rounded w-full max-w-sm shadow-lg relative">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details below.</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full py-1 px-2 border border-purple-300 rounded focus:outline-primary"
              value={formData.name}
              onChange={handleOnChange}
            />
          </div>

          {/* Profile Photo Input */}
          <div>
            <div>Photo:</div>
            <div className="my-1 flex items-center gap-4">
              <Avatar
                width={56}
                height={56}
                imageUrl={formData?.profile_pic}
                name={formData?.name}
              />
              <button
                type="button"
                className="font-semibold hover:underline"
                onClick={handeOpenUploadPhoto}
              >
                Change Photo
              </button>
              <input
                type="file"
                name="profile_pic"
                id="profile_pic"
                className="hidden"
                onChange={handleUploadPhoto}
                ref={uploaPhotoRef}
              />
            </div>
          </div>

          {/* Divider */}
          <Divider />

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white py-1 px-4 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
            >
              Close
            </button>
            <button
             onClick={handleSubmit}
              type="submit"
              className="bg-purple-600 text-white py-1 px-4 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(EditUserDetails);
