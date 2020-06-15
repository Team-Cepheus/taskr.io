import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar'
import TodoColumn from './TodoColumn';
import '../../styles/BoardPage.css'
import InProgressColumn from './InProgressColumn';
import CompletedColumn from './CompletedColumn';
import { DragDropContext } from 'react-beautiful-dnd';
import useCheckAuth from '../../helpers/checkAuth';
import useFetchData from '../../helpers/fetchData';
import { useSelector, useDispatch } from 'react-redux';
import { setTodoTasks, setPendingTasks, setDoneTasks, sort } from '../../redux/user_actions';
import ErrorModal from '../ErrorModal';

const BoardPage = () => {
    useCheckAuth();
    const currentWorkspaceId = useSelector(
        (state) =>
            state.userReducer.workspaces.length !== 0 ?
                state.userReducer.workspaces[state.userReducer.currentWorkspaceIndex]._id
                : 0
    );

    // Get currently selected workspace data which has user and tasks as objects
    const workspaceData = useFetchData(`workspace/${currentWorkspaceId}`, 'GET');
    // console.log(workspaceData);

    const todo = useSelector((state) => state.userReducer.todoTasks);
    const pending = useSelector((state) => state.userReducer.pendingTasks);
    const done = useSelector((state) => state.userReducer.doneTasks);
    const error = useSelector((state) => state.userReducer.error);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    let authData = '';
    if (localStorage.getItem('auth')) {
        authData = JSON.parse(localStorage.getItem('auth'));
    }

    useEffect(() => {
        if (workspaceData) {
            setUsers(workspaceData.users.map((user) => user.username));
            let t = [];
            let p = [];
            let d = [];
            console.log(workspaceData.tasks);
            workspaceData.tasks.forEach(task => {
                if (task.status == 'done') {
                    d.push(task);
                    console.log(d);
                } else if (task.status == 'pending') {
                    p.push(task);
                } else {
                    t.push(task)
                }
            });
            console.log(t);
            console.log(p);
            console.log(d);

            dispatch(setTodoTasks(t));
            dispatch(setPendingTasks(p));
            dispatch(setDoneTasks(d));

        }
    }, [workspaceData]);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        console.log(result);
        if (!destination) {
            return
        }
        console.log(source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId);
        dispatch(sort(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            authData.value.token
        ));
    }

    return (
        <div>
            <Topbar users={users} />
            <Sidebar />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="board">
                    <TodoColumn todo={todo}  workspaceUsers={workspaceData ? workspaceData.users : undefined}/>
                    <InProgressColumn pending={pending} workspaceUsers={workspaceData ? workspaceData.users : undefined} />
                    <CompletedColumn done={done} workspaceUsers={workspaceData ? workspaceData.users : undefined} />
                    <ErrorModal error={error} />
                </div>
            </DragDropContext>
        </div>
    );
}

export default BoardPage;
