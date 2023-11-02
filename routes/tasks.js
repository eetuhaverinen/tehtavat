const express = require('express');
const router = express.Router();
const Task = require('../models/task'); 

async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.task = task;
    next();
}


// Hae kaikki tehtävät
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Lisää uusi tehtävä
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Muokkaa tehtävää
router.put('/:id', getTask, async (req, res) =>{
    if(req.body.title != null){
        res.task.title = req.body.title;
    }
    if(req.body.description != null){
        res.task.description = req.body.description;
    }
    if (req.body.deadline != null) {
        res.task.deadline = req.body.deadline;
    }
    try {
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Poista tehtävä
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted task' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ... muut reitit (muokkaa, poista jne.)

module.exports = router;