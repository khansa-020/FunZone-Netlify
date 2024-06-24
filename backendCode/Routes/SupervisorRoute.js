import express from "express";
import {
  deleteAppointement,
  getSupById,
  getSupervisor,
  supervisorAppointments,
  updateAppointmentStatus,
  updateSupervisor,
} from "../Controllers/SupervisorController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const router = express.Router();

// Get single supervisor info

router.post("/getsupervisor", authMiddleware, getSupervisor);

// update supervisor profile

router.post("/updatesupervisor", authMiddleware, updateSupervisor);

// get single supervisor info

router.post("/getsupbyid", authMiddleware, getSupById);
router.post("/supervisorappointments", authMiddleware, supervisorAppointments);
router.post(
  "/updateappointmentstatus",
  authMiddleware,
  updateAppointmentStatus
);
router.delete("/:id/deleteappointment", authMiddleware, deleteAppointement);

export default router;
