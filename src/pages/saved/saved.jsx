import React from 'react';
import Layout from "../../layout";
import navigateToLogin from '../../utils/routes/navigateToLogin';
import { auth } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Saved = () => {
    const navigate = useNavigate();
    const[logedUser,setLogedUser] = useAuthState(auth);
    if(!logedUser) navigateToLogin(navigate);
    return (
        <Layout>
            Saved Post will appear here xoxo
        </Layout>


    );
}

export default Saved;
