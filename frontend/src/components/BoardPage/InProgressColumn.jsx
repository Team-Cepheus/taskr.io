import React from 'react';
import AddTaskForm from '../AddTaskForm';

const InProgressColumn = (props) => {
    return ( 
        <div className="inprogresscol">
            <div className="add-task">
                <h3>IN PROGRESS</h3>
                <AddTaskForm/>
            </div>
            <div className="rule inprog"></div>
            <div className="tasks">
                {props.children}
            </div>
        </div>
     );
}
 
export default InProgressColumn;