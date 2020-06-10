import React from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import '../styles/DashboardPage.css'
import useCheckAuth from '../helpers/checkAuth';

const DashboardPage = () => {
    useCheckAuth()

    return ( 
        <>
            <Topbar/>
            <Sidebar/>
            <div className="create-workspace-banner">
                <h1 className="cta">Create a workspace</h1>
                <p>Create a new workspace or ask another user to add you to a workspace</p>
                <button className="create-btn">Create a workspace</button>
            </div>
        </>
     );
}
 
export default DashboardPage;