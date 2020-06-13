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
                <AddTaskForm status={"done"}/>
            </div>
            <div className="rule comp"></div>
            <Droppable droppableId="doneTasks">
                {(provided) => (
                    <div
                        className="tasks"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {done ? done.map((task, i) => <TaskCard data={task} id={`done-${i}`} key={i} index={i} />) : ''}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default CompletedColumn;