import React from 'react';
import AddTaskForm from '../AddTaskForm';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const InProgressColumn = (props) => {
    return ( 
        <div className="inprogresscol">
            <div className="add-task">
                <h3>IN PROGRESS</h3>
                <AddTaskForm/>
            </div>
            <div className="rule inprog"></div>
            <Droppable droppableId="todo">
                {(provided) => (
                        <div
                            className="tasks"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <TaskCard id={5} />
                            <TaskCard id={6} />
                            <TaskCard id={7} />
                            {provided.placeholder}
                        </div>
                )}
            </Droppable>
        </div>
     );
}
 
export default InProgressColumn;