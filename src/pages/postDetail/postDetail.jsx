// PostDetail.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Message from "../../assets/components/message";
import Layout from "../../layout";
import Button from "../../assets/utils/button";
import Answer from '../../assets/components/answer';
import submitMessage from "./functions/submitMessage";
import getComments from "./functions/getComments";
import getLikes from "./functions/getLikes";
import UserList from '../../assets/components/userList';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import navigateToLogin from '../../utils/routes/navigateToLogin';

const PostDetail = () => {
  const [logedUser,setLogedUser] = useAuthState(auth);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const avatar = searchParams.get('avatar');
  const username = searchParams.get('username');
  const description = searchParams.get('description');
  const userId = searchParams.get('userId');
  const postId = searchParams.get('postId');
  const time = searchParams.get('time');
const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessages] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const [displayComments, setDisplayComments] = useState(true);
  const [displayLikes, setDisplayLikes] = useState(false);


  if(!logedUser) navigateToLogin(navigate);

  useEffect(() => {
    getComments(postId, setAllMessages);
    getLikes(postId, setAllLikes);
  }, [postId]);

  const handleSubmit = async () => {
    const success = await submitMessage(postId, message);
    if (success) {
      setMessage("");
    }
  };

  const handleDisplayComments = () => {
    setDisplayComments(true);
    setDisplayLikes(false);
  }
  const handleDisplayLikes = () => {
    setDisplayComments(false);
    setDisplayLikes(true);
  }

   
  return (

    <Layout>
      <Message username={username} avatar={avatar}  description={description} userId={userId} postId={postId} time={time} />
      
      <div class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label for="comment" class="sr-only">Your comment</label>
          <textarea id="comment" rows="6" onChange={(e) => setMessage(e.target.value)}
            value={message}
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..." required></textarea>
        </div>
        <Button title="Comment" onClick={handleSubmit} />
      </div>
      <div className='flex gap-5 mb-5'>
        <h1 onClick={handleDisplayComments}
          className={`focus:ring-4 focus:ring-gray-50 font-bold text-slate-600 my-10 ${displayComments ? "text-lg" : ""}`}
        >comments</h1>
        <h1 onClick={handleDisplayLikes}
          className={`focus:ring-4 focus:ring-gray-50 font-bold text-slate-600 my-10 ${displayLikes ? "text-lg" : ""}`}
        >likes</h1>
      </div>
      {displayComments && (<div className="">
        {allMessage?.map((message) => (
          <div key={message.id} className="">
            <Answer avatar={message.photoURL}
              description={message.message}
              username={message.displayName}
              userId={message.userId}
              time={formatDistanceToNow(
                new Date(message.time.seconds * 1000),
                { addSuffix: true }
              )}
            />
          </div>
        ))}
      </div>)}
      {displayLikes && (<div className="py-">
        {allLikes?.map((likes) => (
          <div className="relative" key={likes.time}>

            <UserList image={likes.photoURL} username={likes.displayName} userId={userId} />
          </div>
        ))}
      </div>)}
    </Layout>

  );
};

export default PostDetail;
