import { Router } from "express";
import {
  createSalary,
  employeeSalaries,
  getAllSalaries,
  deleteSalary,
  updateSalary,
} from "../controllers/payroll.controllers.js";
export const router = Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.post("/salary", verifyJWT, createSalary);
router.get("/salary/:id", verifyJWT, employeeSalaries);
router.get("/salary", verifyJWT, getAllSalaries);
router.put("/salary/:id", verifyJWT, updateSalary);
router.delete("/salary:id", verifyJWT, deleteSalary);
