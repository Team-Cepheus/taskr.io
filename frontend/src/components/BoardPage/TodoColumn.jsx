import React from 'react';
import AddTaskForm from '../AddTaskForm';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard'

const TodoColumn = ({ todo, workspaceUsers }) => {
    console.log(todo);
    return (

        <div className="todocol">
            <div className="add-task">
                <h3>TO-DO</h3>
                <AddTaskForm status={"todo"} workspaceUsers={workspaceUsers} />
            </div>
            <div className="rule todo"></div>
            <Droppable droppableId="todoTasks">
                {(provided) => (
                        <div
                            className="tasks"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {todo ? todo.map((task, i) => <TaskCard data={task} id={`todo-${i}`} key={i} index={i} />): ''}
                            
                            {provided.placeholder}
                        </div>
                )}
            </Droppable>
        </div>

    );
}

export default TodoColumn;