import { useEffect, useState } from "react";
import "./App.css";

const API = "https://sticky-notes-backend-brrd.onrender.com/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Fetch Notes
  const fetchNotes = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add Note
  const addNote = async () => {
    if (!title || !body) {
      alert("Please enter title and body!");
      return;
    }

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    setTitle("");
    setBody("");
    fetchNotes();
  };

  // Delete Note
  const deleteNote = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    fetchNotes();
  };

  // Edit Note
  const editNote = async (id, oldTitle, oldBody) => {
    const newTitle = prompt("Edit Title:", oldTitle);
    const newBody = prompt("Edit Body:", oldBody);

    if (newTitle && newBody) {
      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, body: newBody }),
      });
      fetchNotes();
    }
  };

  return (
    <div className="App">
      <h1 className="logo">📝 My Notes</h1>

      <div className="note-form">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <button onClick={addNote}>Add Note</button>
      </div>

      <div className="notes-container">
        {notes.map((note) => (
          <div className="note-card" key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>

            <button
              className="edit-btn"
              onClick={() =>
                editNote(note._id, note.title, note.body)
              }
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;