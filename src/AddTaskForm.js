import React, { useState } from 'react';
import './TaskForm.css';


function AddTaskForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = React.useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            title,
            description,
            deadline
        });
        setTitle('');
        setDescription('');
        setDeadline('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Kurssi"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Tehtävä"
                value={description}
                onChange={e => setDescription(e.target.value)}
            ></textarea>
            <input
                type="date"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
            />
            <button type="submit">Lisää</button>
        </form>
    );
}

export default AddTaskForm;