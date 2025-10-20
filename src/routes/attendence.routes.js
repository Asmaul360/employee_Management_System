import { Router } from "express";
import {
  markAttendance,
  createAttendance,
  deleteAttendance,
  updateAttendance,
  getAllAttendance,
  getAllAttendanceByEmployee,
} from "../controllers/attendance.controllers.js";
export const router = Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.post("/attendance/:id", verifyJWT, createAttendance);
router.put("/attendance", verifyJWT, markAttendance);
router.put("/attendance/:id", verifyJWT, updateAttendance);
router.get("/attendance", verifyJWT, getAllAttendance);
router.get("/attendance/:id", verifyJWT, getAllAttendanceByEmployee);

router.delete("/attendance/:id", verifyJWT, deleteAttendance);
