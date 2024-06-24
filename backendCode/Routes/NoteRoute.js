import express from "express";
import {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} from "../Controllers/NotesController.js";
import authMiddleWare from "../Middleware/authMiddleware.js";

const router = express.Router();

router.route("/:id").get(authMiddleWare, getNotes);
router.route("/:id/create").post(authMiddleWare, createNote);
router
  .route("/:id/specificnote")
  .get(getNoteById)
  .put(authMiddleWare, updateNote)
  .delete(authMiddleWare, deleteNote); // specific note

export default router;
