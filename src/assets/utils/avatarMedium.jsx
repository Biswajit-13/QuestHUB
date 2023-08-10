import React from 'react';

const AvatarMedium = ({onClick,image}) => {
    return (

        <img onClick={onClick} class="hover:cursor-pointer w-12 h-12 p-1 rounded-full" src={image} alt="Bordered avatar" />

    );
}

export default AvatarMedium;
