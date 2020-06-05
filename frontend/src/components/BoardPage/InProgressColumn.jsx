import React from 'react';

const InProgressColumn = (props) => {
    return ( 
        <div className="inprogresscol">
            <div className="add-task">
                <h3>IN PROGRESS</h3>
                <button className="add-btn">+</button>
            </div>
            <div className="rule inprog"></div>
            <div className="tasks">
                {props.children}
            </div>
        </div>
     );
}
 
export default InProgressColumn;