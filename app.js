const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000; // You can change this port number if needed

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Endpoint to store a note
app.post('/notes', (req, res) => {
  try {
    const newNote = req.body;
    // const notes = loadNotes();
    const notes = []
    notes.push(newNote);
    saveNotes(notes);
    res.status(201).json({ message: 'Note added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to retrieve all notes
app.get('/notes', (req, res) => {
  try {
    const notes = loadNotes();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

function loadNotes() {
  try {
    const notesData = fs.readFileSync('notes.json', 'utf8');
    return JSON.parse(notesData);
  } catch (error) {
    return [];
  }
}

function saveNotes(notes) {
  const notesJSON = JSON.stringify(notes, null, 2);
  fs.writeFileSync('notes.json', notesJSON);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
