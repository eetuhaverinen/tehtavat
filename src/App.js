import React, { useState, useEffect } from 'react'; // Tuodaan useState ja useEffect
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Tuodaan sovelluksen omat komponentit
import About from './About';
import Users from './Users';
import EditTaskForm from './EditTaskForm';
import AddTaskForm from './AddTaskForm';
import TaskList from './Tasklist';
import TaskModal from './TaskModal';


function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Haetaan tehtävät backendistä
  useEffect(() => {
      fetch(`https://tehtavat.onrender.com/api/tasks`)
          .then(response => response.json())
          .then(data => setTasks(data))
          .catch(error => console.error('Virhe haettaessa tehtäviä:', error));
  }, []);
  const handleAddTask = (task) => {
    // POST-pyyntö backendiin uuden tehtävän lisäämiseksi
    fetch(`https://tehtavat.onrender.com/api/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(newTask => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    })
    .catch(error => console.error('Error adding task:', error));
};
const handleUpdateTask = (taskId, updatedTask) => {
  // PUT-pyyntö backendiin tehtävän päivittämiseksi
  fetch(`https://tehtavat.onrender.com/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
  })
  .then(response => response.json())
  .then(data => {
      setTasks(prevTasks => prevTasks.map(task => task._id === taskId ? data : task));
      setEditingTask(null); // Sulje muokkauslomake
  })
  .catch(error => console.error('Error updating task:', error));
};

const handleDeleteTask = (taskId) => {
// DELETE-pyyntö backendiin tehtävän poistamiseksi
fetch(`https://tehtavat.onrender.com/api/tasks/${taskId}`, {
    method: 'DELETE'
})
.then(() => {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
})
.catch(error => console.error('Error deleting task:', error));
};

const handleCancelEdit = () => {
setEditingTask(null); // Sulje muokkauslomake
};

const handleTaskClick = (task) => {
setSelectedTask(task);
};

return (
  <div className="App">
      <Router>
          <Navbar expand="lg" className="bg-body-tertiary">
              <Container>
                  <Navbar.Brand as={Link} to='/'>Koti</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                          <Nav.Link as={Link} to='/'>Koti</Nav.Link>
                          <Nav.Link as={Link} to='/about'>Tietoa</Nav.Link>
                          <Nav.Link as={Link} to='/users'>Käyttäjät</Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>

          <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/users" element={<Users />} />
              <Route path="/" element={
                  // Tehtävienhallinnan UI täällä
                  <div id= 'sisalto'>
                      <h1>Koulutehtävät</h1>
                      {editingTask ? (
                          <EditTaskForm task={editingTask} onUpdate={handleUpdateTask} onCancel={handleCancelEdit} />
                      ) : (
                          <div>
                              <AddTaskForm onAdd={handleAddTask} />
                              <TaskList tasks={tasks} onEdit={setEditingTask} onTaskClick={handleTaskClick} onDelete={handleDeleteTask} />
                              <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
                          </div>
                      )}
                  </div>
              } />
          </Routes>
      </Router>
  </div>
);
}

export default App;