import React, { useState } from 'react'
import { FaReact } from 'react-icons/fa6'
import _ from 'lodash'
import { IoIosChatbubbles } from "react-icons/io";

const UserLogin = ({ setUser }) => {
  const [userName, setUserName] = useState('')

  const handleUser = () => {
    if (!userName) return
    localStorage.setItem('user', userName)
    setUser(userName)
    localStorage.setItem('avatar', `https://picsum.photos/id/${_.random(1, 1000)}/200/300`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <div className="text-center mb-6">
          <IoIosChatbubbles className="text-4xl text-teal-400 mx-auto mb-2 animate-spin-slow" />
          <h1 className="text-3xl font-bold text-white">Group Chat App</h1>
        </div>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter a Unique Name"
            className="mb-4 w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-500 focus:border-teal-400 focus:outline-none"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            onClick={handleUser}
            className="w-full py-3 rounded-lg bg-teal-500 text-white font-bold text-lg hover:bg-teal-600 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
