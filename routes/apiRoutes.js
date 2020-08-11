const path = require('path');
const fs = require('fs');

const readNotes = () => {
  const noteData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/db.json'))
  );
  return noteData;
};

const writeNotes = (noteData) => {
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(noteData),
    (err) => {
      if (err) return { err };
    }
  );
};

module.exports = function (app) {
  // When the user visits a link, they are shown a JSON of the data in the table.
  app.get('/api/notes', (req, res) => {
    let noteData = readNotes();
    res.json(noteData);
  });

  // Below code handles when a user submits a form and thus submits data to the server

  app.post('/api/notes', function (req, res) {
    // Server responds to user request to post new note
    let noteData = readNotes();
    let newNote = req.body;
    let lastNoteID = !noteData[0] ? 0 : noteData[noteData.length - 1].id;
    let newNoteID = lastNoteID + 1;

    newNote.id = newNoteID;
    noteData.push(newNote);
    writeNotes(noteData);
    return res.json(noteData);
  });

  app.delete('/api/notes/:id', function (req, res) {
    const noteData = readNotes();
    const noteId = req.params.id;
    const newNote = noteData.filter((note) => {
      return note.id != noteId;
    });

    writeNotes(newNote);
    res.send(newNote);
  });
};
