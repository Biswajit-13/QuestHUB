import { db } from "../../../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const getComments = async (postId, setAllMessages) => {
  const docRef = doc(db, "posts", postId);
  const unsubscribe = onSnapshot(docRef, (snapshot) => {
    setAllMessages(snapshot.data().comments);
  });
  return unsubscribe;
};

export default getComments;
