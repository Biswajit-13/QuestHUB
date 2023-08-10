// updatePost.js
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

const updatePost = async (postId, editedDescription) => {
  try {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, { description: editedDescription });
    console.log("Your post has been updated!");
  } catch (error) {
    console.error("Error updating the post:", error);
  }
};

export default updatePost;
