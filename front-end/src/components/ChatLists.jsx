import React, { useEffect, useRef } from "react";

const ChatLists = ({ chats }) => {
  const endOfMessages = useRef();
  const user = localStorage.getItem("user");

  function SenderChat({ message, username, avatar }) {
    return (
      <div className="flex justify-end items-start mt-3">
        <img src={avatar} alt="" className="w-8 h-8 rounded-full" />
        <p className="bg-white text-black p-2 rounded-lg max-w-[40%] ml-2 min-w-[150px] break-words">
          <span className="font-bold">{username.toUpperCase()}</span> <br />
          {message}
        </p>
      </div>
    );
  }

  function ReceiverChat({ message, username, avatar }) {
    return (
      <div className="flex justify-start items-start mt-3">
        <img src={avatar} alt="" className="w-8 h-8 rounded-full" />
        <p className="bg-white text-black p-2 rounded-lg max-w-[40%] ml-2 min-w-[150px] break-words">
          <span className="font-bold">{username.toUpperCase()}</span> <br />
          {message}
        </p>
      </div>
    );
  }

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => {
    endOfMessages.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-[75vh] overflow-y-scroll scrollbar-none scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {chats.map((chat, index) => {
        if (chat.username === user) {
          return (
            <SenderChat
              key={index}
              message={chat.message}
              username={chat.username}
              avatar={chat.avatar}
            />
          );
        } else {
          return (
            <ReceiverChat
              key={index}
              message={chat.message}
              username={chat.username}
              avatar={chat.avatar}
            />
          );
        }
      })}
      <div ref={endOfMessages}></div>
    </div>
  );
};

export default ChatLists;
