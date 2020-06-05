import React from 'react';
import AddTaskForm from '../AddTaskForm';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard'

const TodoColumn = () => {
    return (

        <div className="todocol">
            <div className="add-task">
                <h3>TO-DO</h3>
                <AddTaskForm />
            </div>
            <div className="rule todo"></div>
            <Droppable droppableId="todo">
                {(provided) => (
                        <div
                            className="tasks"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <TaskCard id={1} />
                            <TaskCard id={2} />
                            <TaskCard id={3} />
                            <TaskCard id={4} />
                            {provided.placeholder}
                        </div>
                )}
            </Droppable>
        </div>

    );
}

export default TodoColumn;