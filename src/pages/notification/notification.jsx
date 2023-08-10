import React from 'react';
import Layout from "../../layout";
import navigateToLogin from '../../utils/routes/navigateToLogin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
    const navigate = useNavigate();
    const[logedUser,setLogedUser] = useAuthState(auth);
    if(!logedUser) navigateToLogin(navigate);
    return (
        <Layout>
            Recent notifications will appear here xoxo
        </Layout>


    );
}

export default Notification;
