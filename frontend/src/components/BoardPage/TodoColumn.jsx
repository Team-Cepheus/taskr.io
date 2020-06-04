import React from 'react';


const TodoColumn = (props) => {
    return (
        <div className="todocol">
            <div className="add-task">
                <h3>TO-DO</h3>
                <button className="add-btn">+</button>
            </div>
            <div className="rule todo"></div>
            {props.children}
        </div>
    );
}

export default TodoColumn;