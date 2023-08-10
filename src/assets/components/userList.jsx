import React from 'react';
import AvatarSmall from "../utils/avatarSmall";
import { Link } from 'react-router-dom';
const UserList = ({onClick,image,username,userId}) => {
    return (
        <Link to={`/user/${userId}?avatar=${image}&username=${username}&userId=${userId}`}>
        <div onClick={onClick} className="flex items-center gap-2 p-2  shadow-lg bg-gray-50 rounded-sm">
    
            <AvatarSmall image={image}/>
            <h1 className=" text-sm font-semibold text-slate-800">{username}</h1>
       
        </div>
 </Link>
    );
}

export default UserList;
