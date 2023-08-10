import React from 'react';
import InputSmall from "../utils/inputSmall";
import Button from "../utils/button";
import {FaGoogle,FaFacebook,FaTwitter} from "react-icons/fa"

const LoginForm = () => {
    return (
        <div class="min-h-screen flex items-center justify-center">
        <div class="flex flex-col items-center gap-4">
          <div class="flex items-center gap-2">
            <InputSmall placeholder="enter your mail" />
            <Button title="get verification code" />
          </div>
          <div class="flex gap-2">
            <Button icon={<FaGoogle />} title="Google"/>
            <Button icon={<FaTwitter />} title="Twitter" />
            <Button icon={<FaFacebook />} title="Facebook" />
          </div>
        </div>
      </div>
    );
}

export default LoginForm;
