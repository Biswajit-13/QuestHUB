import React from 'react';

const AvatarLarge = ({image}) => {
    return (
        <img class="w-16 h-16 p-1 rounded-full  dark:ring-gray-500" src={image} alt="Bordered avatar"/>

    );
}

export default AvatarLarge;
