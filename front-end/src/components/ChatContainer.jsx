import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaVideo, FaPhone } from "react-icons/fa";
import ChatLists from "./ChatLists";
import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIOClient from "socket.io-client";

const ChatContainer = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const socketio = socketIOClient("https://chat-app-1-3nhu.onrender.com");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socketio.on("chat", (chats) => {
      setChats(chats);
    });

    socketio.on("message", (msg) => {
      setChats((prevChats) => [...prevChats, msg]);
    });

    return () => {
      socketio.off("chat");
      socketio.off("message");
    };
  }, []);

  const addMessage = (chat) => {
    const newChat = {
      username: user,
      message: chat,
      avatar: avatar,
    };
    socketio.emit("newMessage", newChat);
  };

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    setUser("");
    setAvatar("");
  };

  return (
    <div className="h-screen flex flex-col  bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
      {user ? (
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-between items-center p-4 bg-transparent md:px-20 px-3">
            <div className="flex items-center gap-4 ">
              <img
                src={avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-2 font-bold text-xl text-white">{user.toUpperCase()}</span>
            </div>
            <div className="flex items-center md:gap-20 gap-10">
             <div className="flex items-center space-x-6">
             <FaVideo className="text-white hover:text-green-600 cursor-pointer w-5 h-5" />
             <FaPhone className="text-green-300 cursor-pointer w-5 h-5" />
             </div>
              <button
                className="text-red-400"
                onClick={Logout}
              >
                <FaSignOutAlt className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 bg-transparent md:px-10 px-3">
            <ChatLists chats={chats} />
          </div>
          <div className="p-4 bg-transparent">
            <InputText addMessage={addMessage} />
          </div>
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
};

export default ChatContainer;
