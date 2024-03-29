import React, {Component} from 'react';
import './sign-in.style.css'
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, signInWithGoogle} from "../../firebase/firebase.utils";


class SignIn extends Component {
    constructor() {
        super();
        this.state={
            email:'',
            password:''
        }
    }

    handleSubmit=async event=>{
        event.preventDefault()
        const {email,password}=this.state
        try {
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({email:'',password:''})
        }catch (error){
            console.log(error)
        }
    }
    handleChange=event=>{
        const {value,name}=event.target;
        this.setState({[name]:value})
    }
    render() {
        const {email,password}=this.state
        return (
            <div className={'sign-in'}>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type={'email'} name={'email'}
                        handleChange={this.handleChange} value={email}
                        label={'Email'} required/>
                    <FormInput
                        type={'password'}
                        name={'password'} label={'Password'}
                        handleChange={this.handleChange} value={password} required/>
                    <div className={'buttons'}>
                        <CustomButton  type={'submit'}>SIGN IN</CustomButton>
                        <CustomButton  onClick={signInWithGoogle} isGoogleSignIn>{' '} SIGN IN with Google {' '}</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;