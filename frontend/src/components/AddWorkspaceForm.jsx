import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/ModalForm.css';
import { useSelector, useDispatch } from 'react-redux';
import { config } from '../config'
import { addWorkspace, setError } from '../redux/user_actions';
import { trackPromise } from 'react-promise-tracker';



const AddWorkspaceForm = ({ isDashboard }) => {
    const authData = useSelector((state) => state.authReducer.authData);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([{ username: null }]);
    const dispatch = useDispatch();


    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    function handleChange(i, event) {
        const values = [...fields];
        values[i].username = event.target.value;
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({ username: null });
        setFields(values);
    }

    function handleRemove(i) {
        if (fields.length > 1) {
            const values = [...fields];
            values.splice(i, 1);
            setFields(values);
        }

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const usernames = fields.map(field => field.username);
        console.log(JSON.stringify({ name: title, admin: authData.value.user.username, users: [authData.value.user.username, ...usernames], tasks: [] }))
        // console.log(authData.value);
        const response = await trackPromise(fetch(`${config.apiURL}/workspace`, {
            'method': 'POST',
            headers: {
                'Authorization': 'Bearer ' + authData.value.token,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ 
                name: title, 
                admin: authData.value.user.username, 
                users: [authData.value.user.username, ...usernames].filter((value) => value!=null ), 
                tasks: [] 
            })
        }));

        const data = await trackPromise(response.json());
        if (response.ok) {
            toggleModal();
            dispatch(addWorkspace(data));
            console.log(response);
            window.location.reload();
        } else if ( !response.ok){
            dispatch(setError('Username(s) not found! Make sure all usernames are correct'));
            console.log('error set');
        }
    
    }

    return (
        <>
            {isDashboard ?
                <button onClick={toggleModal} className="create-btn">Create a workspace </button> :
                <button className="add-btn" onClick={toggleModal}>+</button>}
            <Modal
                ariaHideApp={false}
                className="form-modal"
                overlayClassName="Overlay"
                isOpen={isOpen}
                shouldCloseOnOverlayClick={true}
                onRequestClose={toggleModal}
                aria={{
                    labelledby: "Add Workspace Form"
                }}>

                <div className="add-form">
                    <form onSubmit={onSubmit}>
                        <label htmlFor="workspaceName">Workspace Name</label>
                        <input type="text" name="title" id="workspaceName" placeholder="Workspace Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <div>
                            <label htmlFor="assignTo">Add Members to the workspace</label>
                            <button className="add-btn add-input" type="button" onClick={() => handleAdd()}>
                                +
                        </button>
                        </div>

                        {fields.map((field, idx) => {
                            return (
                                <div key={`${field}-${idx}`} className="add-user">
                                    <input
                                        type="text"
                                        placeholder="Enter username"
                                        onChange={e => handleChange(idx, e)}
                                    />
                                    {
                                        fields.indexOf(field) > 0 ? (
                                            <button type="button" className="btn remove-input" onClick={() => handleRemove(idx)}>
                                                x
                                            </button>) : ''
                                    }

                                </div>
                            );
                        })}

                        <button className="btn" type="submit" > Add Workspace</button>
                    </form>
                </div>

            </Modal>
        </>
    );
}

export default AddWorkspaceForm;
