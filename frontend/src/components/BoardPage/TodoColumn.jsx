import React from 'react';
import AddTaskForm from '../AddTaskForm';


const TodoColumn = (props) => {
    return (
        <div className="todocol">
            <div className="add-task">
                <h3>TO-DO</h3>
              
                <AddTaskForm/>
            </div>
            <div className="rule todo"></div>
            <div className="tasks">
                {props.children}
            </div>

        </div>
    );
}

export default TodoColumn;