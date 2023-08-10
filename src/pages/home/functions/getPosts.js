// getPost.js
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import {db} from "../../../utils/firebase";

const getPosts = (setAllPosts) => {

  const collectionRef = collection(db, 'posts');
  const q = query(collectionRef, orderBy('timestamp', 'desc'));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // Call the callback with the updated posts array whenever it changes
    setAllPosts(posts);
  });
  return unsubscribe;
};

export default getPosts;
