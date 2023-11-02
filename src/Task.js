
import './Task.css';

import React from 'react';

function Task({ task, onTaskClick, onEdit, onDelete }) {
    return (
        <div className="task">
            <div id='click' onClick={() => onTaskClick(task)}>
            <h3>{task.title}</h3>
            <p>{task.deadline}</p>
            </div>
            <div id = 'napit'>
            <button onClick={() => onEdit(task)}>Muokkaa</button>
            <button onClick={() => onDelete(task._id)}>Poista</button>
            </div>
        </div>
    );
}

export default Task;