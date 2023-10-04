import React,{useState} from 'react';
import Layout from '../../layout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from '../../utils/firebase';
import navigateToLogin from '../../utils/routes/navigateToLogin';
import submitPost from './functions/submitPost';
import { useNavigate } from 'react-router-dom';
import Button from "../../assets/utils/button";

const Post = () => {
  const navigate = useNavigate();
    const[logedUser,setLogedUser] = useAuthState(auth);
    const [post, setPost] = useState({
      description: '',
    });
     if(!logedUser) navigateToLogin(navigate);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      submitPost(post, logedUser, navigate); // Call the submitPost function
 
    };
  
  
  
    return (
        <Layout>
         <div className=" p-5 shadow-sm rounded-lg max-w-md mx-auto">
     <h1 className='flex p-5 text-slate-600 font-semibold'>What's on your mind?</h1>
      <form onSubmit={handleSubmit}>
      <div class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label for="comment" class="sr-only">Your comment</label>
          <textarea 
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            class="px-0 w-full h-40 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a post..." required></textarea>
        </div>
        <Button title="Post" onClick={handleSubmit} />
      </div>
      </form>
    </div>
        </Layout>
    );
}

export default Post;
