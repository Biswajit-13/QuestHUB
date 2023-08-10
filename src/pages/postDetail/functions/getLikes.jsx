import { db } from "../../../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const getLikes = async (postId, setAllLikes) => {
  const docRef = doc(db, "posts", postId);
  const unsubscribe = onSnapshot(docRef, (snapshot) => {
    setAllLikes(snapshot.data().likes);
  });
  return unsubscribe;
};

export default getLikes;
