import React from 'react';

const IconsUtil = ({icon,number,onClick}) => {
    return (
      <button onClick={onClick} class="flex items-center gap-2 px-2 py-2 bg-gray-100 hover:text-gray-400 
      text-gray-700 font-sm text-xs rounded-full shadow-lg outline-none focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-110" type="button">
      {icon} {number}
    </button>
    
    );
}

export default IconsUtil;
