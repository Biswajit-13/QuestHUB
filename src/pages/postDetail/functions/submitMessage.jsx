import { toast } from "react-toastify";
import {auth, db } from "../../../utils/firebase";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";

const submitMessage = async (postId, message) => {
  // Check if the user is logged in
  if (!auth.currentUser) return false;

  if (!message) {
    // Display an error toast for empty messages
    console.log(message);
    toast.error("Don't leave an empty message", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
    return false;
  }

  const docRef = doc(db, "posts", postId);
  await updateDoc(docRef, {
    comments: arrayUnion({
      message,
      photoURL: auth.currentUser.photoURL,
      displayName: auth.currentUser.displayName,
      time: Timestamp.now(),
      userId: auth.currentUser.uid,
    }),
  })
  toast.success("Comment uploaded", {
    position: toast.POSITION.TOP_CENTER
  });;

  return true;
};

export default submitMessage;
