import React from 'react';
import '../../styles/TaskCard.css'

const TaskCard = () => {
    return ( 
        <div className="task-card">
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

     );
}
 
export default TaskCard;