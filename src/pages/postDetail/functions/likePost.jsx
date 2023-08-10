import { useState, useEffect } from "react";
import { db } from "../../../utils/firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { FaHeart } from "react-icons/fa";
import {AiOutlineHeart} from "react-icons/ai";
import IconsUtil from "../../../assets/utils/iconsUtil";

const LikeButton = ({ likeLen,postId, userId, displayName, photoURL }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Fetch the post data and check if the user has already liked the post
    const fetchLikeStatus = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", postId));
        if (postDoc.exists()) {
          const likes = postDoc.data().likes;
          setIsLiked(likes.some((like) => like.userId === userId));
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchLikeStatus();
  }, [postId, userId]);

  const handleLike = async () => {
    try {
      const postRef = doc(db, "posts", postId);
      if (isLiked) {
        // Remove the user object from the likes array if already liked
        await updateDoc(postRef, {
          likes: arrayRemove({ userId, displayName, photoURL }),
        });
      } else {
        // Add the user object to the likes array if not liked
        await updateDoc(postRef, {
          likes: arrayUnion({ userId, displayName, photoURL }),
        });
      }
      setIsLiked((prevIsLiked) => !prevIsLiked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  // Render the heart icon based on the like status
  return (
    <div>
      {isLiked ? (
        // <FaHeart onClick={handleLike} style={{ cursor: "pointer" }} />
      <IconsUtil number={likeLen} icon={<FaHeart style={{color:'#fe2c54'}}/>} onClick={handleLike}/>
        ) : (
          <IconsUtil icon={<AiOutlineHeart/>} onClick={handleLike}/>
      )}
    </div>
  );
};

export default LikeButton;
