import React from 'react';
import '../styles/Topbar.css'

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="brand">
                <h1 className="title-brand">taskr. <span>io</span> </h1>
            </div>
            <div className="greeting">
                <h2>Hello, User</h2>
            </div>
        </div>
    );
}

export default Topbar;
