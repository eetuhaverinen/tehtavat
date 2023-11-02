import React from 'react';
import Task from './Task';
import './TaskList.css';

function TaskList({ tasks, onTaskClick, onEdit, onDelete }) {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <Task key={task._id} task={task} onTaskClick={onTaskClick} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default TaskList;