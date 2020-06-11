import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/ModalForm.css';
import { config } from '../config'
import { useSelector, useDispatch } from 'react-redux';


const AddTaskForm = ({ status }) => {
    const authData = useSelector((state) => state.authReducer.authData);
    const currentWorkspace = useSelector((state) => state.userReducer.workspaces[state.userReducer.currentWorkspace])
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    console.log(currentWorkspace);

    const toggleModal = () => {
        console.log(isOpen)
        setIsOpen(!isOpen)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${config.apiURL}/task`, {
            'method': 'POST',
            headers: {
                'Authorization': 'Bearer ' + authData.value.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, status, description, assignedTo })
        })
        if (!response.ok) {
            console.log('Error addding task')
        } else {
            toggleModal();
            const data = await response.json();
            console.log(JSON.stringify({ workspaceID: currentWorkspace._id, taskID: data._id }));
            const addTaskToWorkspaceResponse = await fetch(`${config.apiURL}/workspace/workspaceTask`, {
                'method': 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + authData.value.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workspaceID: currentWorkspace._id, taskID: data._id })
            });
            // if (addTaskToWorkspaceResponse.ok) {
            //     dispatch(addd)
            // }

            console.log('AddTaskToWorkspaceResponse' + addTaskToWorkspaceResponse);

        }
    }

    return (
        <>
            <button className="add-btn" onClick={toggleModal}>+</button>
            <Modal
                ariaHideApp={false}
                className="form-modal"
                overlayClassName="Overlay"
                isOpen={isOpen}
                closeTimeoutMS={500}
                shouldCloseOnOverlayClick={true}
                onRequestClose={toggleModal}
                aria={{
                    labelledby: "Add Task Form"
                }}>

                <div className="add-form">
                    <form onSubmit={onSubmit}>
                        <label htmlFor="taskTitle">Title</label>
                        <input type="text" name="title" id="taskTitle"
                            placeholder="Task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <label htmlFor="taskDesc">Description</label>
                        <textarea name="desc" id="taskDesc" cols="25" rows="5"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                        <label htmlFor="assignTo">Assign Task to</label>
                        <input type="text" id="assignTo" placeholder="Enter username for the user"
                            required
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                        />
                        <button className="btn" type="submit" >Create Task</button>
                    </form>
                    {error && <p className="error text">{error}</p>}
                </div>

            </Modal>
        </>
    );
}

export default AddTaskForm;