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
import { useSelector } from 'react-redux';
import { useState } from 'react';

const BoardPage = () => {
    useCheckAuth();
    const currentWorkspaceId = useSelector(
        (state) =>
            state.userReducer.workspaces.length !== 0 ?
                state.userReducer.workspaces[state.userReducer.currentWorkspace]._id
                : 0)
    console.log(currentWorkspaceId);

    const workspaceData = useFetchData(`workspace/${currentWorkspaceId}`, 'GET');
    console.log(workspaceData);

    const [todo, setTodo] = useState([]);
    const [pending, setPending] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(() => {
        if (workspaceData) {
            let t = [];
            let p = [];
            let d = [];
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
            setTodo(t);
            setPending(p);
            setDone(d);
        }
    }, [workspaceData]);
    // const useFetchData()

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
