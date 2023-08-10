import React, { useEffect } from 'react';
import Layout from "../../layout";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../utils/firebase";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa"
import Button from '../../assets/utils/button';
import InputSmall from '../../assets/utils/inputSmall';
import googleLogin from "./functions/googleLogin";
import twitterLogin from './functions/twitterLogin';
import facebookLogin from "./functions/facebookLogin";
import navigateToHome from "../../utils/routes/navigateToHome";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import largologo from "../../assets/pictures/largologo.png"

const Login = () => {
    const navigate = useNavigate();
    const [logedUser, setLogedUser] = useAuthState(auth);

    //login with google
    const handleGoogleLogin = async () => {
        await googleLogin(); // Use the googleLogin function from the imported file
    };

    //login with twitter
    const handleTwitterLogin = async () => {
        await twitterLogin();
    }

    //login with facebook
    const handleFacebookLogin = async () => {
        await facebookLogin();
    }

    //check if the user is already loged in 
    useEffect(() => {
        if (logedUser) {
            console.log("a user is here");
            navigateToHome(navigate);
            toast.success("Welcome", {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            console.log("please login");
        }
    }, [logedUser]);

    return (
        <Layout>
            <div className='flex flex-col items-center shadow:lg'> 
                <img src={largologo} alt='company logo' className="" />
                <Button title={"Continue with Gooogle"}
                    onClick={handleGoogleLogin}
                    icon={<FaGoogle />} />
            </div>
        </Layout>
    );
}

export default Login;
