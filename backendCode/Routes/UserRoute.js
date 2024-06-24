import express from "express";
import {
  getAllUsers,
  deleteUser,
  followUser,
  getUser,
  UnFollowUser,
  updateUser,
  getAllSearchUsers,
  addSupervisor,
  getAllNotification,
  deleteAllNotification,
  getAllApprovedSupervisors,
  scheduleMeeting,
  checkAvailability,
  userAppointmentsList,
  addUser,
  removeUser,
  updateUserByAdmin,
  generateWarning,
} from "../Controllers/UserController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/search", authMiddleware, getAllSearchUsers);
router.get("/:id", getUser);
router.put("/:id", authMiddleware, updateUser);
router.put("/:id/update", authMiddleware, updateUserByAdmin);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/:id/follow", authMiddleware, followUser);
router.put("/:id/unfollow", authMiddleware, UnFollowUser);
router.put("/:id/addstudent", authMiddleware, addUser);
router.put("/:id/removestudent", authMiddleware, removeUser);

router.post("/addsupervisor", authMiddleware, addSupervisor);
router.post("/getallnotification", authMiddleware, getAllNotification);
router.post("/deleteallnotification", authMiddleware, deleteAllNotification);
router.post("/schedulemeeting", authMiddleware, scheduleMeeting);
router.post("/checkavailability", authMiddleware, checkAvailability);
// meeting appointments list
router.get("/userappointmentslist", authMiddleware, userAppointmentsList);

router.get(
  "/getallapprovedsupervisors",
  authMiddleware,
  getAllApprovedSupervisors
);

router.post("/sendwarning", authMiddleware, generateWarning);
export default router;
