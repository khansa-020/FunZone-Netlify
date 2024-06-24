import express from "express";
import {
  accessChat,
  addToRoom,
  createRoomChat,
  fetchChat,
  removeFromRoom,
  renameRoom,
} from "../Controllers/ChatController.js";
const router = express.Router();
router.post("/:id", accessChat);
router.get("/:id", fetchChat);
router.post("/:id/room", createRoomChat);
router.put("/rename", renameRoom);
router.put("/addtoroom", addToRoom);
router.put("/removefromroom", removeFromRoom);
export default router;
