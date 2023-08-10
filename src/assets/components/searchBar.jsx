import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import UserList from './userList';
import { AiOutlineSearch } from 'react-icons/ai';
import IconsUtil from '../utils/iconsUtil';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);

      const users = [];
      usersSnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      setUserList(users);
    };

    fetchUsers();
  }, []);
const searchfound = ()=>{
  setSearchTerm('');
}
  useEffect(() => {
    const filteredUsers = userList.filter(user =>
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredUsers);
  }, [searchTerm, userList]);

  return (
    <div className="flex items-center justify-center">
     <div class='max-w-md mx-auto'>
    <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-sm bg-white overflow-hidden">
        <div class="grid place-items-center h-full w-12 text-gray-300">
            <AiOutlineSearch style={{color:'black',fontSize:17}}/>
        </div>
        <input
        class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Search something.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        /> 
    </div>
</div>

      {searchTerm && searchResults.length > 0 && (
       <div class="z-10  bg-white absolute top-20 divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          {searchResults.map((user) => (
            <UserList onClick={searchfound} key={user.id} username={user.displayName} 
            image={user.photoURL} userId={user.userId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
