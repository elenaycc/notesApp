import React, { useState, useEffect } from "react";
import Note from "./Note.jsx";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedColor, setSelectedColor] = useState("#f28b82");

  const colors = ["#f28b82", "#fbbc04", "#fff475", "#ccff90", "#a7ffeb"];

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notesData"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (noteText.trim() === "") return;
    const newNote = {
      id: Date.now(),
      text: noteText,
      color: selectedColor,
    };
    setNotes([newNote, ...notes]);
    setNoteText("");
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>NotesApp</h1>

      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <textarea
        className="note-textarea"
        placeholder="Enter your note here..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
<div className="options">
      <div className="color-picker">
        {colors.map((color) => (
          <span
            key={color}
            className={`color-circle ${selectedColor === color ? "selected" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      <button className="add-button" onClick={handleAddNote}>
        ADD
      </button>
</div>

      <div className="notes-container">
        {filteredNotes.map((note) => (
          <Note
            key={note.id}
            text={note.text}
            color={note.color}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
