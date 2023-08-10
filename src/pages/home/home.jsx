// Home.jsx
import React, { useEffect, useState } from 'react';
import Layout from '../../layout';
import Message from '../../assets/components/message';
import Answer from '../../assets/components/answer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import navigateToLogin from '../../utils/routes/navigateToLogin';
import { useNavigate } from 'react-router-dom';
import getPosts from './functions/getPosts';
import getFollowers from '../userDetail/functions/getFollowers';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


const Home = () => {
  const navigate = useNavigate();
  const [logedUser, setLogedUser] = useAuthState(auth);
  const [allPosts, setAllPosts] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [newPost, setNewPost] = useState(true);
  const [followingPost, setFollowingPost] = useState(false);

  const displayRegularPosts = () => {
    setNewPost(true);
    setFollowingPost(false);
  }

  const displayFollowingPosts = () => {
    setNewPost(false);
    setFollowingPost(true);
  }

  useEffect(() => {
    if (logedUser) { // Check if the user is authenticated
      // Fetch all posts and store them in allPosts state
      getPosts(setAllPosts);
      getFollowers(logedUser.uid, setFollowers, setFollowings);
    } else {
      navigateToLogin(navigate); // Redirect to login if user not authenticated
    }
  }, [logedUser, navigate]);

  return (
    <Layout
      displayRegularPosts={displayRegularPosts}
      displayFollowingPosts={displayFollowingPosts}>
      {/* Render the list of posts as Message components */}
      {newPost && (
        <div>
          {allPosts.map((post) => (
            <Message key={post.id}
              description={post.description} username={post.displayName}
              avatar={post.photoURL} postId={post.id} userId={post.userId}
              time={formatDistanceToNow(
                new Date(post.timestamp.seconds * 1000),
                { addSuffix: true }
              )}
              likeLen={post.likes?.length > 0 ? post.likes?.length : 0}
              commentLen={post.comments?.length > 0 ? post.comments?.length : 0}
            >
            </Message>

          ))}
        </div>)}
      {followingPost && (
        <div>
          {logedUser && (
            <div>
              <h1>Followings</h1>
              {allPosts
                .filter(post => followings.some(following => following.userId === post.userId))
                .map((post) => (
                  <Message key={post.id} description={post.description} username={post.displayName}
                    avatar={post.photoURL} postId={post.id} userId={post.userId}
                    time={formatDistanceToNow(
                      new Date(post.timestamp.seconds * 1000),
                      { addSuffix: true }
                    )}
                    likeLen={post.likes?.length > 0 ? post.likes?.length : 0}
                    commentLen={post.comments?.length > 0 ? post.comments?.length : 0}
                  >
                  </Message>

                ))}
            </div>
          )}
        </div>
      )}


    </Layout>
  );
};

export default Home;
