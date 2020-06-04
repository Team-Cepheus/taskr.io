import React from 'react';
import '../styles/Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="profile">
                <img className="avatar" src="/static/avatars/2.png" alt="" />
                <h3>Jane Doe</h3>
                <p>janedoe@gmail.com</p>
            </div>
            <div className="workspaces">
                <div className="add">
                <h3>WORKSPACES</h3>
                <button>+</button>
                </div>
            </div>

        </div>
    );
}

export default Sidebar;