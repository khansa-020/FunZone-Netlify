import express from "express";
import {
  approveProjectForShowcase,
  changeAccountStatus,
  deleteProject,
  deleteSupervisor,
  deleteSupervisorRequest,
  deleteUser,
  getAllApprovedProjects,
  getAllApprovedSupervisors,
  getAllDigitalArtsProjects,
  getAllGamingProjects,
  getAllProjects,
  getAllStudents,
  getAllSupervisedStudents,
  getAllSupervisors,
  getAllUsers,
  getProjectsByCategories,
  getProjectsByCategoriesPieChart,
  getProjectsCretedPerMonth,
  totalProjectsDigitalArts,
  totalProjectsGaming,
  totalStudents,
  totalSupervisors,
  userAppointmentsList,
} from "../Controllers/AdminController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const router = express.Router();
router.get("/getallusers", authMiddleware, getAllUsers);
router.get("/getallstudents", authMiddleware, getAllStudents);
router.get("/:id/getallsupstudents", authMiddleware, getAllSupervisedStudents);
router.get("/getallsupervisors", authMiddleware, getAllSupervisors);
router.get(
  "/getallapprovedsupervisors",
  authMiddleware,
  getAllApprovedSupervisors
);
router.post("/userappointmentslist", authMiddleware, userAppointmentsList);
router.post("/changeaccountstatus", authMiddleware, changeAccountStatus);
router.get("/students/count", authMiddleware, totalStudents);
router.get("/supervisors/count", authMiddleware, totalSupervisors);
router.get("/gamedevelopment/count", authMiddleware, totalProjectsGaming);
router.get("/digitalarts/count", authMiddleware, totalProjectsDigitalArts);

router.get("/getallgamingprojects", authMiddleware, getAllGamingProjects);
router.get(
  "/getalldigitalartsprojects",
  authMiddleware,
  getAllDigitalArtsProjects
);
router.get(
  "/getprojectscreatedpermonth",
  authMiddleware,
  getProjectsCretedPerMonth
);
router.get("/getprojectsbycatgory", authMiddleware, getProjectsByCategories);
router.get(
  "/getprojectsbycatgorypercentage",
  authMiddleware,
  getProjectsByCategoriesPieChart
);
router.get("/getallprojects", authMiddleware, getAllProjects);
router.delete("/:id/deleteproject", authMiddleware, deleteProject);
router.delete("/:id/deleteuser", authMiddleware, deleteUser);
router.delete("/:id/deletesupervisor", authMiddleware, deleteSupervisor);
router.delete("/:id/deleterequest", authMiddleware, deleteSupervisorRequest);
router.put(
  "/:id/changeprojectstatus",
  authMiddleware,
  approveProjectForShowcase
);
export default router;
router.get("/getallapprovedprojects", authMiddleware, getAllApprovedProjects);
