import React, { useEffect, useState } from 'react';
import AvatarLarge from '../utils/avatarLarge';
import IconsUtil from '../utils/iconsUtil';
import Button from "../utils/button";
import AvatarSmall from '../utils/avatarSmall';
import { FaEdit, FaShare, FaSave } from 'react-icons/fa';
import { FcCancel } from "react-icons/fc"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../utils/firebase';
import { toast } from 'react-toastify';
import navigateToLogin from '../../utils/routes/navigateToLogin';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDoc, writeBatch, getDocs, collection, } from "firebase/firestore"
import { useLocation } from 'react-router-dom';

const ProfileCard = ({ avatar, userId, followLen, followingLen, postLen }) => {
  const [logedUser, setLogedUser] = useAuthState(auth);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [editedName, setEditedName] = useState(userName);
  // const docRef = doc(db, "users", logedUser.uid);
  // await updateDoc(docRef, { displayName: editedName });//users change name
  useEffect(() => {
    const fetchDisplayName = async () => {
      try {
        // Assuming you have a 'users' collection and 'displayName' field
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.displayName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchDisplayName();
  }, [userId]);


  return (
    <div className="flex items-center justify-center">
      <div className=" flex items-center justify-center w-full max-w-sm bg-white  rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-center mb-4">
            <AvatarLarge image={avatar} />
          </div>
          <div className="flex-row flex items-center gap-3">


            <h1 className='text-xl font-semibold text-center'>{userName}</h1>

          </div>

          <div className="flex justify-center mt-3 items-center">
            <p className="text-lg font-semibold">{postLen}</p>
            <p className="ml-2 text-gray-600">Posts</p>
          </div>
          <div className="flex justify-center mt-1 items-center">
            <p className="text-lg font-semibold">{followLen}</p>
            <p className="ml-2 text-gray-600">Followers</p>
          </div>
          <div className="flex justify-center mt-1 items-center">
            <p className="text-lg font-semibold">{followingLen}</p>
            <p className="ml-2 text-gray-600">Followings</p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default ProfileCard;
