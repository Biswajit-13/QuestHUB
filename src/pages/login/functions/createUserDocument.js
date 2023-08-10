import { auth,db } from "../../../utils/firebase";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

const createUserDocument = async (uid, displayName, email, photoURL) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);
  
      if (userSnapshot.exists()) {
        // If the document exists, update its data
        await updateDoc(userRef, {
          displayName,
          email,
          photoURL,
          userId: uid,
          // Add any other user data you want to update in the document
        });
      } else {
        // If the document doesn't exist, create a new document
        const userData = {
          displayName,
          email,
          photoURL,
          userId: uid,
          // Add any other user data you want to store in the document
        };
        await setDoc(userRef, userData);
      }
    } catch (error) {
      console.error("Error creating/updating user document:", error);
    }
  };

  export default createUserDocument;