import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as attendanceRouter } from "./routes/attendence.routes.js";

import { router as departmentRouter } from "./routes/department.routes.js";
import { router as employeeRouter } from "./routes/employee.routes.js";
import { router as roleRouter } from "./routes/role.routes.js";
import { router as userRouter } from "./routes/user.routes.js";
import { router as payrollRouter } from "./routes/payroll.routes.js";
export const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1", attendanceRouter);
app.use("/api/v1", departmentRouter);
app.use("/api/v1", employeeRouter);
app.use("/api/v1", roleRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", payrollRouter);
