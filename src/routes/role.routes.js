import { Router } from "express";
import {
  createRole,
  getRoleByID,
  getAllRoles,
  updateRole,
  deleteRole,
} from "../controllers/role.controllers.js";
export const router = Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.post("/createRole", verifyJWT, createRole);
router.get("/getRoleByID/:id", verifyJWT, getRoleByID);
router.get("/getAllRole", verifyJWT, getAllRoles);
router.put("/updateRole/:id", verifyJWT, updateRole);
router.delete("/deleteRole/:id", verifyJWT, deleteRole);
