import React from 'react';
import '../styles/Topbar.css'
import { useSelector } from 'react-redux';

const Topbar = ({ users }) => {
    const authData = useSelector((state) => state.authReducer.authData);

    return (
        <div className="topbar">
            <div className="brand">
                <h1 className="title-brand">taskr. <span>io</span> </h1>
            </div>
            <div className="greeting">
                <h2>Hello, { authData.value ? authData.value.user ? authData.value.user.username: '' : ''}</h2>
            </div>
            <div className="users">
                { users && <span className="users-info">Users in this workspace: </span> }
                { users &&  users.map((user, i) => <span key={i}>{`${user}, `}</span>) }
            </div>
        </div>
    );
}

export default Topbar;
