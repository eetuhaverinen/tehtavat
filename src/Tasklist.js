import React from 'react';
import Task from './Task';
import './TaskList.css';

function TaskList({ tasks, onTaskClick, onEdit, onDelete }) {
    const sortedTasks = tasks.slice().sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    return (
        <div className="task-list">
            {sortedTasks.map(task => (
                <Task key={task._id} task={task} onTaskClick={onTaskClick} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default TaskList;