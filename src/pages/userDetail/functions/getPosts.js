import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../utils/firebase";
const getPosts = async (user, setPosts) => {
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, where("userId", "==", user));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};

export default getPosts;
