import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
} from "../controllers/employee.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
export const router = Router();
router.post(
  "/employee",
  verifyJWT,
  upload.single("profilePhoto"),
  createEmployee
);
router.get("/employee", verifyJWT, getAllEmployees);
router.get("/employee/:id", verifyJWT, getEmployeeById);
router.delete("/employee/:id", verifyJWT, deleteEmployee);
router.put("/employee/:id", verifyJWT, updateEmployee);
