import React from 'react';
import './TaskModal.css';

function ConfirmDeleteModal({ task, onConfirm, onCancel }) {
    if (!task) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Vahvista Poisto</h2>
                <p>Oletko varma, että haluat poistaa tehtävän '{task.title}'?</p>
                <div id="modal-actions2">
                <button onClick={onCancel}>Peruuta</button>
                <button onClick={() => onConfirm(task._id)}>Poista</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;