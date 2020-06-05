import React from 'react';
import '../../styles/TaskCard.css'
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ id }) => {
    return (
        <Draggable draggableId={String(id)} index={id}>
            {(provided) => (
                <div className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div>
                        <h3 className="task-title">Task tile</h3>
                        <span className="timestamp">20 May</span>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum diam non tortor finibus    </p>
                    <div className="task-attributes">
                        <p>BY: <span>User</span></p>
                        <p>ASSIGNED TO: <span>Another user</span></p>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;