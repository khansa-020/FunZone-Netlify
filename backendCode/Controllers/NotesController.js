import asyncHndler from "express-async-handler";
import NoteModel from "../Models/noteModel.js";
export const getNotes = asyncHndler(async (req, res) => {
  const id = req.params.id; //logged in user
  const notes = await NoteModel.find({ user: id });
  res.json(notes);
});

export const createNote = asyncHndler(async (req, res) => {
  const id = req.params.id; //logged in user
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400).json("Please fill all the fields");
    throw new Error("Please fill all the fields!");
  } else {
    const note = new NoteModel({ user: id, title, content, category });
    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

export const getNoteById = asyncHndler(async (req, res) => {
  const note = await NoteModel.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not Found!" });
  }
});

export const updateNote = asyncHndler(async (req, res) => {
  //   const id = req.params.id; //logged in user
  const { title, content, category } = req.body;
  const note = await NoteModel.findById(req.params.id);

  //   if (note.user.toString() !== id.toString()) {
  //     res.json(401);
  //     throw new Error("Action Forbidden");
  //   }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404).json({ message: "Note not Found!" });
  }
});

export const deleteNote = asyncHndler(async (req, res) => {
  //   const id = req.params.id; //logged in user
  const note = await NoteModel.findById(req.params.id);

  //   if (note.user.toString() !== id.toString()) {
  //     res.json(401);
  //     throw new Error("Action Forbidden");
  //   }
  if (note) {
    await note.remove();
    res.json({ message: "Note Removed!" });
  } else {
    res.status(404).json({ message: "Note not Found!" });
  }
});
