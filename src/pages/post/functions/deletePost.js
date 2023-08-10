// deletePost.js
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

const deletePost = async (postId) => {
  try {
    const docRef = doc(db, "posts", postId);
    await deleteDoc(docRef);
    console.log("Post has been deleted!");
  } catch (error) {
    console.error("Error deleting the post:", error);
  }
};

export default deletePost;
