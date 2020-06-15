import React, { useEffect } from 'react';
import '../styles/Sidebar.css';
import AddWorkspaceForm from './AddWorkspaceForm';
import { useSelector, useDispatch } from 'react-redux';
import { unauthorize, setAuthData } from '../redux/auth_actions';
import { useHistory } from 'react-router-dom';
import { config } from '../config';
import useFetchData from '../helpers/fetchData';
import { setWorkspaces, setCurrentWorkspaceIndex } from '../redux/user_actions';

const Sidebar = () => {
    const userData = useSelector((state) => state.authReducer.authData);
    const currentWorkspaceIndex = useSelector((state) => state.userReducer.currentWorkspaceIndex)
    const dispatch = useDispatch();
    const history = useHistory();
    let workspaceData = [];

    workspaceData = useFetchData('users/workspaces', 'GET');

    useEffect(() => {
        console.log(workspaceData);
        if (workspaceData && workspaceData.length !== 0) {
            console.log('workspace data' + workspaceData);
            dispatch(setWorkspaces(workspaceData));
            history.push('/board');
        }
    }, [workspaceData, history, dispatch]);

    const logout = async () => {
        const token = JSON.parse(window.localStorage.getItem('auth')).value.token;
        const response = await fetch(`${config.apiURL}/users/logout`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'

            },
        });
        console.log(response);
    }

    return (
        <div className="sidebar">
            <div className="profile">
                <img className="avatar" src={`/static/avatars/${Math.ceil(Math.random() * 5)}.png`} alt="" />
                <h3>{userData !== undefined && userData.value ? userData.value.user ? userData.value.user.name : '' : ''}</h3>
                <p>{userData !== undefined && userData.value ? userData.value.user ? userData.value.user.email : '' : ''}</p>
            </div>
            <div className="workspaces">
                <div>
                    <h3>WORKSPACES</h3>
                    <AddWorkspaceForm />
                </div>

                {workspaceData ?
                    workspaceData.map((workspace, i) =>
                        <button className={`btn workspace-btn ${currentWorkspaceIndex == i ? 'active-w' : ''}`}
                            key={i}
                            onClick={() => dispatch(setCurrentWorkspaceIndex(i))}
                        >
                            {workspace.name}
                        </button>)
                    : ''}

            </div>
            <button className="btn logout-btn" onClick={() => {
                logout();
                dispatch(unauthorize());
                dispatch(setAuthData(null));
                window.localStorage.removeItem('auth');
                history.push('/')
            }}> Logout </button>

        </div>
    );
}

export default Sidebar;