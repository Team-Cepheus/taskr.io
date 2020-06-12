import React from 'react';
import '../../styles/TaskCard.css'
import { Draggable } from 'react-beautiful-dnd';
import { config } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import { setTodoTasks, setPendingTasks, setDoneTasks } from '../../redux/user_actions';


const TaskCard = ({ id, data, index }) => {

    const authData = JSON.parse(localStorage.getItem('auth'));

    const taskList = useSelector((state) => state.userReducer[data.status + 'Tasks']);
    const dispatch = useDispatch();

    const onClick = async () => {
        if (authData) {
            const response = await fetch(`${config.apiURL}/task/${data._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + authData.value.token,
                    'Content-Type': 'application/json'

                },
            });
            console.log(response);
            if (response.ok) {
                const newTasks = taskList.filter((task) => task._id !== data._id);
                console.log(newTasks);
                if (data.status == 'todo') {
                    dispatch(setTodoTasks(newTasks));
                } else if (data.status == 'pending') {
                    dispatch(setPendingTasks(newTasks));
                } else if (data.status == 'done') {
                    dispatch(setDoneTasks(newTasks));
                }
            }

        }
    }

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div>
                        <h3 className="task-title">{data ? data.title : ''}</h3>
                        <span className="timestamp">{data ? data.createdOn.slice(0, 10) : ''}</span>
                        <button onClick={onClick} className="delete-task-btn">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.875 2.96875H10.6875V1.1875H8.3125V2.96875H7.125V0H11.875V2.96875Z" fill="#17AA9E" />
                                <path d="M13.6562 19H5.34375C4.36006 19 3.5625 18.2024 3.5625 17.2188V4.75H15.4375V17.2188C15.4375 18.2024 14.6399 19 13.6562 19Z" fill="#D75E5E" />
                                <path d="M16.625 5.9375H2.375V3.5625C2.375 2.90671 2.90671 2.375 3.5625 2.375H15.4375C16.0933 2.375 16.625 2.90671 16.625 3.5625V5.9375Z" fill="#17AA9E" />
                                <path d="M12.0235 9.64842C11.7917 9.41663 11.4158 9.41663 11.1839 9.64842L9.64845 11.1838L8.11305 9.64842C7.88112 9.41663 7.50524 9.41663 7.27345 9.64842C7.04166 9.88021 7.04166 10.2561 7.27345 10.488L8.80885 12.0234L7.27345 13.5588C7.04166 13.7908 7.04166 14.1666 7.27345 14.3984C7.50524 14.6302 7.88112 14.6302 8.11305 14.3984L9.64845 12.863L11.1839 14.3984C11.4158 14.6302 11.7917 14.6302 12.0235 14.3984C12.2552 14.1666 12.2552 13.7908 12.0235 13.5588L10.4881 12.0234L12.0235 10.488C12.2552 10.2561 12.2552 9.88021 12.0235 9.64842Z" fill="white" />
                            </svg>
                        </button>

                    </div>
                    <p>{data ? data.description ?? 'No Description' : ''} </p>
                    <div className="task-attributes">
                        <p>BY: <span>User</span></p>
                        <p>ASSIGNED TO: <span>{data ? data.assignedTo : ''}</span></p>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;