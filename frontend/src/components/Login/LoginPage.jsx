import React, { useState } from 'react';
import '../../styles/LoginPage.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const LoginPage = () => {

    const [login, setLogin] = useState(true)

    return (
        <div className="login-page">
            <div className="login-form">
                <h1 className="brand-title">taskr. <span>io</span> </h1>
                <small className="brand-title--subtitle">A minimal kanban task board</small>
                <div className="login-buttons">
                    <button className={`${login && 'active' }`} onClick={() => setLogin(true)}> LOGIN</button>
                    <button className={`${!login && 'active' }`} onClick={() => setLogin(false)}>SIGN UP</button>
                </div>
                {
                    login ? <LoginForm /> : <SignupForm />
                }

            </div>
        </div>
    );
}

export default LoginPage;