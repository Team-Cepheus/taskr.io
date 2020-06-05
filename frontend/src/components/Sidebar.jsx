import React from 'react';
import '../styles/Sidebar.css';
import AddWorkspaceForm from './AddWorkspaceForm';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="profile">
                <img className="avatar" src="/static/avatars/2.png" alt="" />
                <h3>Jane Doe</h3>
                <p>janedoe@gmail.com</p>
            </div>
            <div className="workspaces">
                <div>
                <h3>WORKSPACES</h3>
                <AddWorkspaceForm/>
                </div>
            </div>

        </div>
    );
}

export default Sidebar;