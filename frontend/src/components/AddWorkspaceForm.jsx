import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/ModalForm.css';


const AddWorkspaceForm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [fields, setFields] = useState([{ value: null }]);


    const toggleModal = () => {
        console.log(isOpen)
        setIsOpen(!isOpen)
    }

    function handleChange(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }

    function handleRemove(i) {
        if (fields.length > 1) {
            const values = [...fields];
            values.splice(i, 1);
            setFields(values);
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
                shouldCloseOnOverlayClick={true}
                onRequestClose={toggleModal}
                aria={{
                    labelledby: "Add Workspace Form"
                }}>

                <div className="add-form">
                    <form action="">
                        <label htmlFor="workspaceName">Workspace Name</label>
                        <input type="text" name="" id="workspaceName" placeholder="Workspace Name" />
                        <div>
                            <label htmlFor="assignTo">Assign Task to</label>
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
