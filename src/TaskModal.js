import React from 'react';
import './TaskModal.css';

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
}

function TaskModal({ task, onClose }) {
    if (!task) return null;
    const formattedDeadline = formatDate(task.deadline);
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Deadline: {formattedDeadline}</p>
                <button onClick={onClose}>Sulje</button>
            </div>
        </div>
    );
}

export default TaskModal;