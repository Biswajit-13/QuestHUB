// googleLogin.js
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import createUserDocument from "./createUserDocument";
const googleProvider = new GoogleAuthProvider();

const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const logedUser = result.user;
    await createUserDocument(logedUser.uid, logedUser.displayName, logedUser.email, logedUser.photoURL);
  } catch (error) {
    console.log(error);
  }
};

export default googleLogin;
