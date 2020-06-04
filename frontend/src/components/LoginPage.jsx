import React from 'react';
import '../styles/LoginPage.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-form">
                <h1 className="brand-title">taskr. <span>io</span> </h1>
                <small className="brand-title--subtitle">A minimal kanban task board</small>
                <div className="login-buttons">
                    <button> LOGIN</button>
                    <button>SIGN UP</button>
                </div>
                {/* <LoginForm/> */}
                <SignupForm/>
                {/* <a href="#">Forgot Password?</a> */}
            </div>
        </div>
    );
}

export default LoginPage;