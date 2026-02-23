const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./models/Note");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://aiswarya:aishu2005cluster0.dw7rdin.mongodb.net/notesapp?appName=Cluster0")

//mongoose.connect("mongodb://localhost:27017/notesapp")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log(err));

// CREATE NOTE
app.post("/notes", async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ NOTES
app.get("/notes", async (req, res) => {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
});

// UPDATE NOTE
app.put("/notes/:id", async (req, res) => {
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedNote);
});

// DELETE NOTE
app.delete("/notes/:id", async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
});
const PORT = process.env.PORT||3000;
app.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
});
//app.listen(3000, () => console.log("🚀 Server running on port 3000"));