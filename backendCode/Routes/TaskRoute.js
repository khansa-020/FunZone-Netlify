import express from "express";
import {
  addTask,
  deleteTask,
  getTasksById,
  updateTask,
} from "../Controllers/TaskController.js";
import authMiddleWare from "../Middleware/authMiddleware.js";

const router = express.Router();
router.post("/:id/addtask", authMiddleWare, addTask);
router.get("/:id/gettasks", authMiddleWare, getTasksById);
router.patch("/:id/updatetask", authMiddleWare, updateTask);
router.delete("/:id/deletetask", authMiddleWare, deleteTask);

export default router;
