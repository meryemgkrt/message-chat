import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingButton = ({ text = "Loading..." }) => {
  return (
    <button
      disabled
      type="button"
      className="py-2.5 px-5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 inline-flex items-center"
    >
      <FaSpinner className="inline w-4 h-4 me-3 animate-spin text-purple-500  text-center" />
      {text}
    </button>
  );
};

export default LoadingButton;
