const API = "http://localhost:3000/notes";

async function fetchNotes() {
    const res = await fetch(API);
    const notes = await res.json();
    displayNotes(notes);
}

function displayNotes(notes) {
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    notes.forEach(note => {
        container.innerHTML += `
            <div class="note-card">
                <h3>${note.title}</h3>
                <p>${note.body}</p>
                <button class="edit-btn" onclick="editNote('${note._id}', '${note.title}', '${note.body}')">Edit</button>
                <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
            </div>
        `;
    });
}

async function addNote() {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    if (!title || !body) {
        alert("Please enter title and body!");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body })
    });

    document.getElementById("title").value = "";
    document.getElementById("body").value = "";
    fetchNotes();
}

async function deleteNote(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchNotes();
}

async function editNote(id, oldTitle, oldBody) {
    const title = prompt("Edit Title:", oldTitle);
    const body = prompt("Edit Body:", oldBody);

    if (title && body) {
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body })
        });
        fetchNotes();
    }
}

fetchNotes();