import React from 'react';
import './sing-in-and-sign-up.style.css'
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const SignInAndSignUpPage = () => {
    return (
        <div className={'sign-in-and-sign-up'}>
            <SignIn/>
            <SignUp/>
        </div>
    );
};

export default SignInAndSignUpPage;
