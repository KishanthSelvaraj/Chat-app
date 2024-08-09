import React, { useState } from "react";
import { FaSmile, FaPaperclip } from "react-icons/fa"; // Importing necessary icons
import { LuSendHorizonal } from "react-icons/lu";

const InputText = ({ addMessage }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      addMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center bg-white p-2 rounded-lg w-full justify-center">
      <button className="p-2 rounded-full bg-white hover:bg-gray-200">
        <FaSmile  className="text-[#31bece]" />
      </button>
      <button className="py-2 rounded-full bg-white hover:bg-gray-200 ml-2">
        <FaPaperclip className="text-[#bbbbbb]" />
      </button>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 mx-2  text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none  md:max-w-full max-w-[170px]"
      />
      <button
        onClick={sendMessage}
        className="p-2 rounded-full bg-white hover:bg-gray-200"
      >
        <LuSendHorizonal  className="text-[#24942f] " />
      </button>
    </div>
  );
};

export default InputText;
