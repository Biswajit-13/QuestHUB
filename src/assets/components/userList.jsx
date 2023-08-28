import React from 'react';
import AvatarSmall from "../utils/avatarSmall";
import { Link } from 'react-router-dom';

const UserList = ({ onClick, image, username, userId, text }) => {
  return (
    <Link to={`/user/${userId}?avatar=${image}&username=${username}&userId=${userId}`}>
      <div
        onClick={onClick}
        className="flex items-center gap-2 p-2 shadow-lg bg-gray-50 rounded-sm hover:bg-gray-100 cursor-pointer transition duration-300"
      >
        <AvatarSmall image={image} />
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-slate-800">{username}</h1>
          <p className="text-xs text-gray-600">{text}</p>
        </div>
      </div>
    </Link>
  );
}

export default UserList;
