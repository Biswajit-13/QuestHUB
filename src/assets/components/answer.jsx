import React from 'react';
import AvatarSmall from "../utils/avatarSmall";
import IconsUtil from '../utils/iconsUtil';
import { AiFillAlert, AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { FaComment, FaCommentAlt, FaRegComment, FaShare } from "react-icons/fa";
import Paragraph from '../utils/paragraph';
import { Link } from 'react-router-dom';


const Answer = ({ avatar, username, description, userId, postId, likeLen, commentLen,time }) => {
 

  return (
    <ol class="relative border-l ml-7 border-gray-200 dark:border-gray-700">
      <li class="mb-10 ml-5">
        <Link to={`/user/${userId}?avatar=${avatar}&username=${username}&userId=${userId}`}>
          <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <img class="rounded-full shadow-lg " src={avatar} alt="Thomas Lean image" />
          </span>
        </Link>
        <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
          <div class="items-center justify-between mb-3 sm:flex">
            <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{time} ago</time>
            <Link to={`/user/${userId}?avatar=${avatar}&username=${username}&userId=${userId}`}>
              <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">{username} commented</div>
            </Link>
          </div>
          <div class="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
            {description}
          </div>
        </div>
      </li>
    </ol>
  );
}

export default Answer;
