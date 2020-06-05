import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/AddTaskForm.css';


const AddTaskForm = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        console.log(isOpen)
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button className="add-btn" onClick={toggleModal}>+</button>
            <Modal
                ariaHideApp={false}
                className="addtask-modal"
                overlayClassName="Overlay"
                isOpen={isOpen}
                contentLabel="modalB"
                shouldCloseOnOverlayClick={true}
                onRequestClose={toggleModal}
                aria={{
                    labelledby: "Add Task Form"
                }}>

                <div className="add-task-form">
                    <form action="">
                        <label htmlFor="taskTitle">Title</label>
                        <input type="text" name="" id="taskTitle" placeholder="Task title" />
                        <label htmlFor="taskDesc">Description</label>
                        <textarea name="" id="taskDesc" cols="25" rows="5" placeholder="Description"></textarea>
                        <label htmlFor="assignTo">Assign Task to</label>
                        <input type="text" id="assignTo" placeholder="Enter username for the user" />
                        <button className="btn" type="submit" >Create Task</button>
                    </form>
                </div>

            </Modal>
        </>
    );
}

export default AddTaskForm;