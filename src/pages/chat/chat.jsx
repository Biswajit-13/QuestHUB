import React from 'react';
import Layout from "../../layout";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import navigateToLogin from '../../utils/routes/navigateToLogin';

const Chat = () => {
    const navigate = useNavigate();
    const[logedUser,setLogedUser] = useAuthState(auth);
    if(!logedUser) navigateToLogin(navigate);
    return (
        <Layout>
            Your chats will appear here xoxo
        </Layout>


    );
}

export default Chat;
