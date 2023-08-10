// googleLogin.js
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import createUserDocument from "./createUserDocument";

const facebookProvider = new FacebookAuthProvider();

const facebookLogin = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const logedUser = result.user;
    await createUserDocument(logedUser.uid, logedUser.displayName, logedUser.email, logedUser.photoURL);
  } catch (error) {
    console.log(error);
  }
};

export default facebookLogin;
