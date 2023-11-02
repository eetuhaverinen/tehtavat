const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

// Luo Express-sovellus
const app = express();

// Käytä CORS-middlewarea, jotta frontend voi tehdä pyyntöjä backendiin
app.use(cors());
app.use(express.json());

// Testireitti varmistamaan, että palvelin toimii
app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.use('/api/tasks', tasksRouter);

// Määritä portti
const PORT = process.env.PORT || 5000;

// Kuuntele porttia
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



// Yhdistä MongoDB:hen
const MONGODB_URI = 'mongodb+srv://eetuhav:3A2ZFYJUvtU4156s@cluster0.8upazzp.mongodb.net/?retryWrites=true&w=majority';  // Vaihda oikeaan URI:in, jos käytät pilvipalvelua kuten MongoDB Atlas.

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});