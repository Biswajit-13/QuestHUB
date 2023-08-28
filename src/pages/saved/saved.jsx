import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, getDoc } from 'firebase/firestore';
import Layout from "../../layout";
import navigateToLogin from '../../utils/routes/navigateToLogin';
import { auth, db } from "../../utils/firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Message from '../../assets/components/message';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Saved = () => {
    const navigate = useNavigate();
    const [logedUser] = useAuthState(auth);
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

    useEffect(() => {
        if (!logedUser) {
            navigateToLogin(navigate);
            return;
        }
    
        const userSavedRef = collection(db, 'users', logedUser.uid, 'saved');
        const querySnapshot = query(userSavedRef);
    
        const unsubscribe = onSnapshot(querySnapshot, async (snapshot) => {
            const posts = [];
            for (const docSnapshot of snapshot.docs) {
                const postId = docSnapshot.id;
                console.log('postId:', postId);
                const postRef = doc(db, 'posts', postId);
                const postDoc = await getDoc(postRef);
    
                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    console.log('postData:', postData);
                    const { description, displayName, photoURL, userId, timestamp, likes, comments } = postData;
                    posts.push({
                        id: postId,
                        description,
                        displayName,
                        photoURL,
                        userId,
                        timestamp,
                        likes,
                        comments
                    });
                }
            }
    
            setBookmarkedPosts(posts);
        });
    
        return () => unsubscribe();
    }, [logedUser, navigate]);
    
console.log(bookmarkedPosts)
    return (
        <Layout>
            {bookmarkedPosts.length > 0 ? (
                <div>
                    {bookmarkedPosts.map((post) => (
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
                </div>
            ) : (
                <p>No bookmarked posts yet.</p>
            )}
        </Layout>
    );
}

export default Saved;
