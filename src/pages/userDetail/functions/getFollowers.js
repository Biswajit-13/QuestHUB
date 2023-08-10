import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
const getFollowers = async (user, setFollowers, setFollowings) => {
  try {
    if (user) {
      const userRef = doc(db, "users", user); // Reference to the user document
      const userSnapshot = await getDoc(userRef); // Get the user document snapshot
      if (userSnapshot.exists()) {
        // If the user document exists, retrieve the followers and following fields
        const userData = userSnapshot.data();
        if (userData && userData.followers) {
          setFollowers(userData.followers);
        }
        if (userData && userData.following) {
          setFollowings(userData.following);
        }
      }
    }
  } catch (error) {
    console.error("Error getting followers:", error);
  }
};

export default getFollowers;
