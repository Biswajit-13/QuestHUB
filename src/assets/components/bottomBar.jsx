import React, { useState } from 'react';
import IconsUtil from "../utils/iconsUtil";
import { FaBell, FaBookmark, FaFacebookMessenger, FaFedex, FaGrinHearts, FaHeart, FaHome, FaMailBulk, FaMailchimp, FaPlus, FaPlusCircle, FaRegHeart } from 'react-icons/fa';
import { AiFillAlert, AiFillBell, AiFillHeart, AiFillHome, AiFillMail, AiFillMessage, AiFillPlusCircle, AiFillPlusSquare, AiFillSave, AiOutlineAlert, AiOutlineFunnelPlot, AiOutlineHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import navigateToNotification from '../../utils/routes/navigateToNotification';
import navigateToPost from '../../utils/routes/navigateToPost';
import navigateToSaved from '../../utils/routes/navigateToSaved';
import navigateToHome from '../../utils/routes/navigateToHome';
import navigateToChat from "../../utils/routes/navigateToChat";

const BottomBar = ({ displayRegularPosts, displayFollowingPosts }) => {
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState('new'); // Initialize active button

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };



  return (
    <div class="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="w-full">
        <div className="grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600" role="group">
          <button
            type="button"
            className={`px-5 py-1.5 text-xs font-medium ${activeButton === 'new' ? 'bg-black text-white' : 'text-gray-900'} hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg`}
            onClick={() => {
              handleButtonClick('new');
              displayRegularPosts();
          }}
          >
            New
          </button>
          <button
            type="button"
            className={`px-5 py-1.5 text-xs font-medium ${activeButton === 'popular' ? 'bg-black text-white' : 'text-gray-900'} ${activeButton !== 'popular' ? 'hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700' : ''} rounded-lg`}
            onClick={() => handleButtonClick('popular')}
          >
            Popular
          </button>
          <button
            type="button"
            className={`px-5 py-1.5 text-xs font-medium ${activeButton === 'following' ? 'bg-black text-white' : 'text-gray-900'} hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg`}
            onClick={() => {
              handleButtonClick('following');
              displayFollowingPosts();
            }}
          >
            Following
          </button>
        </div>
      </div>
      <div class="grid h-full max-w-lg grid-cols-4 mx-auto">
        <button data-tooltip-target="tooltip-bookmark" type="button" class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <IconsUtil 
          onClick={()=>navigateToHome(navigate)}
          icon={<AiFillHome style={{fontSize:18}} />} />
        </button>
        <button data-tooltip-target="tooltip-bookmark" type="button" class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <IconsUtil
          onClick={()=>navigateToNotification(navigate)}
          icon={<AiFillHeart style={{fontSize:18}} />} />
        </button>
        <button data-tooltip-target="tooltip-bookmark" type="button" class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <IconsUtil 
          onClick={()=>navigateToPost(navigate)}
          icon={<FaPlus style={{fontSize:18}}/>} />
        </button>
        <button data-tooltip-target="tooltip-bookmark" type="button" class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <IconsUtil
          onClick={()=>navigateToSaved(navigate)}
          icon={<FaBookmark  style={{fontSize:18}}/>} />
        </button>
      </div>
    </div>
  );
}

export default BottomBar;
