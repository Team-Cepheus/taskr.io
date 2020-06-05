import React from 'react';
import AddTaskForm from '../AddTaskForm';


const CompletedColumn = (props) => {
    return (
        <div className="completedcol">
            <div className="add-task">
                <h3>COMPLETED</h3>
                <AddTaskForm/>
            </div>
            <div className="rule comp"></div>
            <div className="tasks">
                {props.children}
            </div>
        </div>
    );
}

export default CompletedColumn;