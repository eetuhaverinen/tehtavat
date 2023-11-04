const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
require('dotenv').config();

// Luo Express-sovellus
const app = express();
const path = require('path');

// Käytä CORS-middlewarea, jotta frontend voi tehdä pyyntöjä backendiin
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

// Testireitti varmistamaan, että palvelin toimii
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api/tasks', tasksRouter);

// Määritä portti
const PORT = process.env.PORT || 5000;

// Kuuntele porttia
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.REACT_APP_API_BASE_URL}`);
});



// Yhdistä MongoDB:hen
const MONGODB_URI = process.env.REACT_APP_MONGODB_URI; 

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});