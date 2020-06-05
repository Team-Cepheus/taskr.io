import React from 'react';


const CompletedColumn = (props) => {
    return (
        <div className="completedcol">
            <div className="add-task">
                <h3>COMPLETED</h3>
                <button className="add-btn">+</button>
            </div>
            <div className="rule comp"></div>
            <div className="tasks">
                {props.children}
            </div>
        </div>
    );
}

export default CompletedColumn;