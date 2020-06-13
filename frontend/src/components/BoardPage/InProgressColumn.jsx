import React from 'react';
import AddTaskForm from '../AddTaskForm';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const InProgressColumn = ({ pending }) => {
    console.log(pending);
    return (
        <div className="inprogresscol">
            <div className="add-task">
                <h3>IN PROGRESS</h3>
                <AddTaskForm status={"pending"}/>
            </div>
            <div className="rule inprog"></div>
            <Droppable droppableId="pendingTasks">
                {(provided) => (
                    <div
                        className="tasks"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {pending ? pending.map((task, i) => <TaskCard data={task} id={`pending-${i}`} key={i} index={i} />) : ''}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default InProgressColumn;