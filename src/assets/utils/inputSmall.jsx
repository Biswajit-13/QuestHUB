import React from 'react';

const InputSmall = ({ placeholder }) => {
    return (

        <form class="m-4 flex">
            <input class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-500 focus:ring focus:ring-pink-200 placeholder-gray-500 bg-white text-gray-800" placeholder={placeholder} />
        </form>



    );
}

export default InputSmall;
