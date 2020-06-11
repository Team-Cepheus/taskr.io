import React from 'react';
import '../styles/Topbar.css'
import { useSelector } from 'react-redux';

const Topbar = () => {
    const authData = useSelector((state) => state.authReducer.authData);

    return (
        <div className="topbar">
            <div className="brand">
                <h1 className="title-brand">taskr. <span>io</span> </h1>
            </div>
            <div className="greeting">
                <h2>Hello, { authData.value ? authData.value.user.username : ''}</h2>
            </div>
        </div>
    );
}

export default Topbar;
