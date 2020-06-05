import React from 'react';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar'
import TodoColumn from './TodoColumn';
import '../../styles/BoardPage.css'
import InProgressColumn from './InProgressColumn';
import CompletedColumn from './CompletedColumn';
import TaskCard from './TaskCard';
import { DragDropContext } from 'react-beautiful-dnd';

const BoardPage = () => {

    const onDragEnd = (result) => {
        //TODO: implement dragging logic
        const { dest, source, draggableId } = result;
        if(!dest) {
            return
        }

    }

    return (
        <div>
            <Topbar />
            <Sidebar />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="board">
                    <TodoColumn/>
                    <InProgressColumn />
                    <CompletedColumn />
                </div>
            </DragDropContext>
        </div>
    );
}

export default BoardPage;
