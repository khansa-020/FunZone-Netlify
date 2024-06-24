import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  VerifyMail,
  changeAccountStatusDeactivate,
} from "../Controllers/AuthController.js";

const router = express.Router();
router.post("/register", registerUser);
// router.get("/verify", VerifyMail);
router.post("/login", loginUser);
router.put(
  "/:id/changeprojectstatusdeactive",
  authMiddleware,
  changeAccountStatusDeactivate
);
export default router;
