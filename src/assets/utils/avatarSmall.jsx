import React from 'react';

const AvatarSmall = ({image}) => {
    return (
        <div class="">

            <img class="w-8 h-8 p-1 hover:cursor-pointer  rounded-full  dark:ring-gray-500"
                src={image} alt="Bordered avatar" />

        </div>
    );
}

export default AvatarSmall;
