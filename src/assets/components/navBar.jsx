import React, { useState } from 'react';
import AvatarMedium from "../utils/avatarMedium";
import SearchBar from './searchBar';
import navigateToHome from '../../utils/routes/navigateToHome';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "../utils/button";

const Navbar = () => {
    const navigate = useNavigate();
    const [logedUser, setLogedUser] = useAuthState(auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleAvatarClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDashboardClick = () => {
        setIsDropdownOpen(false);
    };

    const handleSignOutClick = () => {
        auth.signOut();
        setIsDropdownOpen(false);
    };

    return (
        <div className='flex items-center justify-between my-2 mx-2 py-2 relative'>

            {logedUser && (
                <div className='flex gap-1'>
                <h1 onClick={() => navigateToHome(navigate)} className='text-xl
             hover:cursor-pointer
             text-gray-700 italic'>Quest</h1>
              <h1 onClick={() => navigateToHome(navigate)} className='text-xl
             hover:cursor-pointer
             text-gray-700'>HUB</h1>
             </div>
            )}
            {logedUser && (<SearchBar />
            )}
            {logedUser && (
                <div className="relative">
                    <button onClick={handleAvatarClick}>
                        <AvatarMedium image={logedUser.photoURL} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-12 right-0 mt-2 
                        z-10 bg-white border border-gray-200
                         rounded-lg shadow-md dark:bg-gray-700
                         p-3
                         dark:border-gray-600">
                            <Link to={`/user/${logedUser.uid}?avatar=${logedUser.photoURL}&userId=${logedUser.uid}`}>
                                <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-600" onClick={handleDashboardClick}>
                                    Dashboard
                                </div>
                            </Link>
                            <Button title="Sign Out" onClick={handleSignOutClick} />

                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Navbar;
