import React from 'react';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar'
import TodoColumn from './TodoColumn';
import '../../styles/BoardPage.css'
import InProgressColumn from './InProgressColumn';
import CompletedColumn from './CompletedColumn';
import TaskCard from './TaskCard';

const BoardPage = () => {
    return ( 
    <div>
        <Topbar/>
        <Sidebar />
        <div className="board">
        <TodoColumn>
            <TaskCard/>
        </TodoColumn>  
        <InProgressColumn/>
        <CompletedColumn />
        </div>
    </div> 
    );
}
 
export default BoardPage;