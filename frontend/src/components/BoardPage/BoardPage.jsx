import React, { useEffect } from 'react';
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
import { setTodoTasks, setPendingTasks, setDoneTasks } from '../../redux/user_actions';

const BoardPage = () => {
    useCheckAuth();
    const currentWorkspaceId = useSelector(
        (state) =>
            state.userReducer.workspaces.length !== 0 ?
                state.userReducer.workspaces[state.userReducer.currentWorkspaceIndex]._id
                : 0)
    // console.log(currentWorkspaceId);

    // Get currently selected workspace data which has user and tasks as objects
    const workspaceData = useFetchData(`workspace/${currentWorkspaceId}`, 'GET');
    // console.log(workspaceData);

    const todo = useSelector((state) => state.userReducer.todoTasks );
    const pending = useSelector((state) => state.userReducer.pendingTasks );
    const done = useSelector((state) => state.userReducer.doneTasks );
    const dispatch = useDispatch();

    useEffect(() => {
        if (workspaceData) {
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
        //TODO: implement dragging logic
        const { dest, source, draggableId } = result;
        if (!dest) {
            return
        }
    }

    return (
        <div>
            <Topbar />
            <Sidebar />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="board">
                    <TodoColumn todo={todo} />
                    <InProgressColumn pending={pending} />
                    <CompletedColumn done={done} />
                </div>
            </DragDropContext>
        </div>
    );
}

export default BoardPage;
