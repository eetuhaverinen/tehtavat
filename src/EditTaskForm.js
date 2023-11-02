import './TaskForm.css';

import React, { useState } from 'react';

function EditTaskForm({ task, onUpdate, onCancel }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [deadline, setDeadline] = useState(new Date(task.deadline).toISOString().split('T')[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(task._id, {
            title,
            description,
            deadline
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Tehtävä" 
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea 
                placeholder="Lisätiedot"
                value={description}
                onChange={e => setDescription(e.target.value)}
            ></textarea>
            <input 
                type="date" 
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
            />
            <button type="submit">Tallenna muutokset</button>
            <button type="button" onClick={onCancel}>Peruuta</button>
        </form>
    );
}

export default EditTaskForm;