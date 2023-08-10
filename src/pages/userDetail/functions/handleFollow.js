import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { toast } from "react-toastify";
const handleFollow = async (db, logedUser, user, username, avatar, setIsFollowed) => {
    try {
      const logedUserRef = doc(db, "users", logedUser.uid); // Reference to the logged-in user
      const userRef = doc(db, "users", user); // Reference to the user being followed

      // Check if the logged-in user is already following the user
      const logedUserSnapshot = await getDoc(logedUserRef);
      const following = logedUserSnapshot.data().following || [];
      const isAlreadyFollowing = following.some((item) => item.userId === user);

      if (isAlreadyFollowing) {
        // Remove the target user's data from the following array of the logged-in user
        const newFollowing = following.filter((item) => item.userId !== user);
        await updateDoc(logedUserRef, { following: newFollowing });

        // Remove the logged-in user's data from the followers array of the target user
        const userSnapshot = await getDoc(userRef);
        const followers = userSnapshot.data().followers || [];
        const newFollowers = followers.filter((item) => item.userId !== logedUser.uid);
        await updateDoc(userRef, { followers: newFollowers });
       console.log("you have unfollowed",user.displayName)
       toast.info("Unfollowed",{
        position: toast.POSITION.TOP_CENTER
      });
      } else {
        // Add the target user's data to the following array of the logged-in user
        const newFollowing = [...following, { userId: user, displayName: username, photoURL: avatar }];
        await updateDoc(logedUserRef, { following: newFollowing });

        // Add the logged-in user's data to the followers array of the target user
        const userSnapshot = await getDoc(userRef);
        const followers = userSnapshot.data().followers || [];
        const newFollowers = [...followers, { userId: logedUser.uid, displayName: logedUser.displayName, photoURL: logedUser.photoURL }];
        await updateDoc(userRef, { followers: newFollowers });
        console.log("You have followed", user.displayName)
        toast.success("You are following", {
          position: toast.POSITION.TOP_CENTER
        });
      }
      setIsFollowed((prevIsFollowed) => !prevIsFollowed);
    } catch (error) {
      console.error("Error updating following:", error);
    }
  };
  export default handleFollow;