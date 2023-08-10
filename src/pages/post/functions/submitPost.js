import { updateDoc, addDoc, doc, collection, serverTimestamp } from "firebase/firestore";
import navigateToHome from "../../../utils/routes/navigateToHome";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../utils/firebase";
import{toast} from "react-toastify"
const submitPost = async (post, logedUser, navigate) => {
   

    // Run checks for description
    if (!post.description) {
      return;
    }
    if (post.description.length > 300) {

      return;
    }

    if (post?.hasOwnProperty('id')) {
      const docRef = doc(db, 'posts', post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      console.log("post updated successfully")
  
       navigateToHome(navigate);
    } else {
      // Make a new post
      const collectionRef = collection(db, 'posts');
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        userId: logedUser.uid,
        photoURL: logedUser.photoURL,
        displayName:logedUser.displayName,
      });
      console.log("new post created successfully")
      toast.success("Your post has been shared", {
        position: toast.POSITION.TOP_CENTER
      });
       navigateToHome(navigate);
    }
  };

  export default submitPost;