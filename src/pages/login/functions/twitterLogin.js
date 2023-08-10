// googleLogin.js
import { signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import createUserDocument from "./createUserDocument";
const twitterProvider = new TwitterAuthProvider();

const twitterLogin = async () => {
  try {
    const result = await signInWithPopup(auth, twitterProvider);
    const logedUser = result.user;
    await createUserDocument(logedUser.uid, logedUser.displayName, logedUser.email, logedUser.photoURL);

  } catch (error) {
    console.log(error);
  }
};

export default twitterLogin;
