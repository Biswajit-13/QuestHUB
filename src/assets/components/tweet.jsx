import React, { useState } from 'react';
import { FaHeart, FaComment, FaRetweet, FaEdit, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Tweet = ({ text, userId, avatar, username }) => {
  const [showActions, setShowActions] = useState(false);

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  return (
    <div className="relative border-l ml-7 border-gray-200 dark:border-gray-700">
      <div className="mb-10 ml-5">
        <Link to={`/user/${userId}?avatar=${avatar}&username=${username}&userId=${userId}`}>
          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <img className="rounded-full shadow-lg" src={avatar} alt={`${username} image`} />
          </span>
        </Link>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
          <div className="items-center justify-between mb-3 sm:flex">
            <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">2 hours ago</time>
            <Link to={`/user/${userId}?avatar=${avatar}&username=${username}&userId=${userId}`}>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-300">{username} commented</div>
            </Link>
          </div>
          <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
            {text}
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <button className="text-gray-500 hover:text-gray-800">
              <FaHeart />
            </button>
            <button className="text-gray-500 hover:text-blue-500">
              <FaComment />
            </button>
            <button className="text-gray-500 hover:text-green-500">
              <FaRetweet />
            </button>
            <div className="relative ml-auto">
              <button className="text-gray-500 hover:text-gray-800" onClick={toggleActions}>
                <FaEllipsisH />
              </button>
              {showActions && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600">
                  <button className="block w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                    Edit
                  </button>
                  <button className="block w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                    Share
                  </button>
                  <button className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600">
                    Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
