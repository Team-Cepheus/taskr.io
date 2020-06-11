import React from 'react';
import '../../styles/TaskCard.css'
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ id, data }) => {
    return (
        <Draggable draggableId={String(id)} index={id}>
            {(provided) => (
                <div className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div>
                        <h3 className="task-title">{data ? data.title : ''}</h3>
                        <span className="timestamp">{data ? data.createdOn.slice(0, 10): ''}</span>
                    </div>
                    <p>{ data ? data.description ?? 'No Description': ''} </p>
                    <div className="task-attributes">
                        <p>BY: <span>User</span></p>
                        <p>ASSIGNED TO: <span>{data ? data.assignedTo: ''}</span></p>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;