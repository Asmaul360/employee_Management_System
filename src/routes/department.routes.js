import { Router } from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

export const router = Router();

router.post("/department", verifyJWT, createDepartment);

router.get("/department", verifyJWT, getAllDepartments);

router.get("/department/:id", verifyJWT, getDepartmentById);

router.put("/department/:id", verifyJWT, updateDepartment);

router.delete("/department/:id", verifyJWT, deleteDepartment);
