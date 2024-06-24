import express from "express";
import { sendMessage, allMessages } from "../Controllers/MessageController.js";

const router = express.Router();

router.post("/:id", sendMessage);
router.get("/:chatId/fetchMessages", allMessages);

export default router;
