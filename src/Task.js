import React,  { useState } from 'react';
import './Task.css';
import ConfirmDeleteModal from './ConfirmDeleteModal';



function Task({ task, onTaskClick, onEdit, onDelete }) {
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    const handleDeleteClick = () => {
        setIsConfirmingDelete(true);
    };

    const handleConfirmDelete = (taskId) => {
        onDelete(taskId);
        setIsConfirmingDelete(false);
    };

    const handleCancelDelete = () => {
        setIsConfirmingDelete(false);
    };

    return (
        <>
            {isConfirmingDelete && (
                <ConfirmDeleteModal
                    task={task}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
            <div className="task">
                {
                    <div id='click' onClick={() => onTaskClick(task)}>
                        <h3>{task.title}</h3>
                        <p>{task.deadline}</p>
                    </div>}
                <div id='napit'>
                    <button onClick={() => onEdit(task)}>Muokkaa</button>
                    <button onClick={handleDeleteClick}>Poista</button>
                </div>
            </div>
        </>
    );
}

export default Task;
