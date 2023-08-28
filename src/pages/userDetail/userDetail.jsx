import React, { useState, useEffect } from 'react';
import ProfileCard from '../../assets/components/profileCard';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Layout from "../../layout";
import Button from '../../assets/utils/button';
import { auth, db } from '../../utils/firebase';
import { getDoc, doc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import getPosts from "./functions/getPosts";
import handleFollow from "./functions/handleFollow";
import getFollowers from './functions/getFollowers';
import Message from '../../assets/components/message';
import UserList from '../../assets/components/userList';
import navigateToLogin from '../../utils/routes/navigateToLogin';


const UserDetail = () => {

    const [logedUser, setLogedUser] = useAuthState(auth);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const avatar = searchParams.get('avatar');
    const username = searchParams.get('username');
    const user = searchParams.get('userId') // targetted user
    const [isFollowed, setIsFollowed] = useState(false);
    const [followers, setFollowers] = useState([]);//store the followers
    const [followings, setFollowings] = useState([]);//store the followings
    const [posts, setPosts] = useState([]); //store the user's posts
    const [displayPost, setDisplayPost] = useState(true);
    const [displayFollowers, setDisplayFollowers] = useState(false);
    const [displayFollowings, setDisplayFollowings] = useState(false);

    const navigate = useNavigate();
    if (!logedUser) navigateToLogin(navigate);
    const handleFollowClick = async () => {
        try {
            if (logedUser) {
                handleFollow(db, logedUser, user, username, avatar, setIsFollowed);
            }
        } catch (error) {
            console.error("Error handling follow:", error);
        }
    };

    const dispPosts = () => {
        setDisplayFollowers(false);
        setDisplayFollowings(false);
        setDisplayPost(true);
    }
    const dispfollowers = () => {
        setDisplayFollowers(true);
        setDisplayFollowings(false);
        setDisplayPost(false);
    }
    const dispFollowings = () => {
        setDisplayFollowers(false);
        setDisplayFollowings(true);
        setDisplayPost(false);
    }


    useEffect(() => {
        const checkIsFollowed = async () => {
            try {
                if (logedUser && user) {
                    const logedUserRef = doc(db, "users", logedUser.uid);
                    const logedUserSnapshot = await getDoc(logedUserRef);
                    const following = logedUserSnapshot.data().following || [];
                    setIsFollowed(following.some((item) => item.userId === user));
                }
            } catch (error) {
                console.error("Error checking if followed:", error);
            }
        };

        checkIsFollowed();
        getFollowers(user, setFollowers, setFollowings);
        getPosts(user, setPosts)
    }, [logedUser, user]);

    return (
        <Layout>
            <ProfileCard avatar={avatar} userName={username} userId={user} followLen={followers.length} followingLen={followings.length} postLen={posts.length} />
            {logedUser && (

                <div>
                    {logedUser.uid != user && (
                        <div className="flex justify-center mt-4 gap-5">
                            {isFollowed && (
                                <Button title="Following" onClick={handleFollowClick} />
                            )}
                            {!isFollowed && (
                                <Button title="Follow" onClick={handleFollowClick} />
                            )}
                        </div>
                    )}
                </div>
            )}


            {logedUser && (
                <div className='flex gap-4  mb-5 mt-5 hover:cursor-pointer'>
                    {logedUser.uid == user && (
                    <h1 onClick={dispPosts} 
                    className={`focus:ring-4 focus:ring-gray-50 font-bold text-slate-800 my-10 ${displayPost ? "text-lg" : ""}`}
                    >My Posts</h1>)}
                    {logedUser.uid != user && (
                    <h1 onClick={dispPosts} 
                    className={`focus:ring-4 focus:ring-gray-50 font-bold text-slate-600 my-10 ${displayPost ? "text-lg" : ""}`}
                    >Posts</h1>)}
                    <h1 onClick={dispfollowers} 
                    className={`focus:ring-4 focus:ring-gray-50 font-bold text-slate-600 my-10 ${displayFollowers ? "text-lg" : ""}`}
                    >Followers</h1>
                     <h1 onClick={dispFollowings} 
                    className={`focus:ring-4 focus:ring-gray-50 font-bold text-slate-600 my-10 ${displayFollowings ? "text-lg" : ""}`}
                    >Followings</h1>
                </div>
            )}


            {displayPost && (
                <div>
                    {posts.map((post) => (
                        <Message key={post.id} description={post.description} username={post.displayName}
                            avatar={post.photoURL} postId={post.id} userId={post.userId}
                            likeLen={post.likes?.length > 0 ? post.likes?.length : 0}
                            commentLen={post.comments?.length > 0 ? post.comments?.length : 0}
                        >
                        </Message>
                    ))}
                </div>
            )}
            {displayFollowers && (
                <div>
                    {followers.map((follower) => (
                        <UserList image={follower.photoURL} username={follower.displayName} userId={follower.userId} />
                    ))}
                </div>
            )}
            {displayFollowings && (
                <div>
                    {followings.map((following) => (
                        <UserList image={following.photoURL} username={following.displayName} userId={following.userId} />
                    ))}
                </div>
            )}
    
        </Layout>
    );
}

export default UserDetail;
