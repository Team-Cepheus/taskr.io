import React from 'react';
import AddTaskForm from '../AddTaskForm';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';


const CompletedColumn = ({ done }) => {
    console.log(done);

    return (
        <div className="completedcol">
            <div className="add-task">
                <h3>COMPLETED</h3>
                <AddTaskForm/>
            </div>
            <div className="rule comp"></div>
            <Droppable droppableId="todo">
                {(provided) => (
                    <div
                        className="tasks"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {done ? done.map((task, i) => <TaskCard data={task} id={i} key={i} />) : ''}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default CompletedColumn;