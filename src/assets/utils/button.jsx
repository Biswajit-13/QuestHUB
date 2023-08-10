import React from 'react';

const Button = ({icon,title,onClick}) => {
    return (
      <button onClick={onClick}
      class=" flex flex-row px-5 py-1.5 text-xs font-medium bg-black text-white hover:bg-gray-200 hover:text-black dark:text-black dark:hover:bg-gray-700 rounded-lg" type="button">
      <div class="gap-2 flex items-center justify-center ml-2">
        {icon}
     
      <p class="item-center justify-center text-parent">{title}</p>
     </div>
    </button>
    
    );
}

export default Button;
