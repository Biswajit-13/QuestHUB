import React, { useState } from 'react';
import AvatarSmall from "../utils/avatarSmall";
import IconsUtil from '../utils/iconsUtil';
import { AiOutlineComment, AiOutlineEdit, AiOutlineDelete, AiOutlineShareAlt } from "react-icons/ai";
import { FaBookmark, FaComment, FaRegBookmark, FaSave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc"
import Paragraph from '../utils/paragraph';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import updatePost from "../../pages/post/functions/updatePost";
import deletePost from "../../pages/post/functions/deletePost";
import LikeButton from '../../pages/postDetail/functions/likePost';
import { toast } from 'react-toastify';


const Message = ({ avatar, username, description, userId, postId, likeLen, commentLen,time }) => {
  const [logedUser] = useAuthState(auth);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEditButtonClick = () => {
    setIsEditMode(!isEditMode);
  };

  const cancel = () => {
    setIsEditMode(false);
  }

  const handleSaveButtonClick = async () => {
    try {
      await updatePost(postId, editedDescription);
      setIsEditMode(false); // Disable edit mode after saving.
      toast.success("Post updated", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      await deletePost(postId);
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

 

  return (
    <div className="flex flex-col justify-center mb-3 px-2 py-2">
      <ol class="relative ml-2 border-gray-200 dark:border-gray-700">
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
              <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">{username} posted</div>
            </Link>
          </div>
            {isEditMode ? (
              <div className=''>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={3}
                  className="text-gray-500 dark:text-gray-400 w-full"
                />
                <div className='flex gap-2'>
                  <IconsUtil icon={<FaSave />} number="save" onClick={handleSaveButtonClick}></IconsUtil>
                  <IconsUtil icon={<FcCancel />} number="cancel" onClick={cancel} />
                </div>
              </div>
            ) : (

              <div class="p-3 text-xs font-normal text-gray-800 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                {description}
              </div>
            )}


          </div>

        </li>
      </ol>
      <div className="flex items-center space-x-4 justify-center">
        {logedUser && (<LikeButton postId={postId} userId={logedUser.uid} displayName={logedUser.displayName} photoURL={logedUser.photoURL} likeLen={likeLen} />
        )}
        {/* Link to the PostDetail page with the post's ID and other data as query parameters */}
        <Link to={`/post/${postId}?avatar=${avatar}&username=${username}&description=${description}&userId=${userId}&postId=${postId}&time=${time}`}>
          <IconsUtil icon={<AiOutlineComment />} number={commentLen} />
        </Link>
        <IconsUtil icon={<FaRegBookmark />} />
        {userId === logedUser?.uid && (
          <>
            <IconsUtil icon={<AiOutlineDelete />} onClick={handleDeleteButtonClick} />
            <IconsUtil icon={<AiOutlineEdit />} onClick={handleEditButtonClick} />
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
