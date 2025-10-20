import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { Attendance } from "../models/attendence.model.js";

export const markAttendance = asyncHandler(async (req, res) => {
  const employee = req.user._id; // <- use req.user instead of req.employee
  if (!employee) throw new ApiError(401, "Unauthorized: Employee not found");

  const { status = "Present", remarks } = req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let attendanceRecord = await Attendance.findOne({ employee, date: today });
  if (attendanceRecord) {
    throw new ApiError(400, "Attendance for today is already marked.");
  }

  attendanceRecord = await Attendance.create({
    employee,
    date: today,
    status,
    remarks,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, attendanceRecord, "Attendance marked successfully!")
    );
});

export const createAttendance = asyncHandler(async (req, res) => {
  const { date, status, checkInTime, checkOutTime, totalHours, remarks } =
    req.body;
  const { id: employee } = req.params;
  const createAttendanceRecord = await Attendance.create({
    employee,
    date,
    status,
    checkInTime,
    checkOutTime,
    totalHours,
    remarks,
  });
  if (!createAttendanceRecord) {
    throw new ApiError(400, "Unable to create Attendance Record");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createAttendanceRecord,
        " Attendance Created Record successfully !!"
      )
    );
});
export const deleteAttendance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteAttendanceRecord = await Attendance.findByIdAndDelete(id);
  if (!deleteAttendanceRecord) {
    throw new ApiError(400, "Unable to delete Attendance Record");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "Deleted Attendance Record successfully !!")
    );
});
export const updateAttendance = asyncHandler(async (req, res) => {
  const { date, status, totalHours, remarks } = req.body;
  const { id } = req.params;

  const updateAttendanceRecord = await Attendance.findByIdAndUpdate(
    id,
    {
      date,
      status,
      totalHours,
      remarks,
    },
    { new: true, runValidators: true }
  );

  if (!updateAttendanceRecord) {
    throw new ApiError(400, "Unable to update Attendance Record");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateAttendanceRecord,
        "Attendance updated successfully!!"
      )
    );
});

export const getAllAttendance = asyncHandler(async (req, res) => {
  const getAllAttendance = await Attendance.find()
    .sort({ createdAt: -1 })
    .populate("employee");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        getAllAttendance,
        "Fetching all attendance successfully"
      )
    );
});
export const getAllAttendanceByEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const employeeAttendance = await Attendance.find({ employee: id }).populate({
    path: "employee",
    populate: {
      path: "user",
      select: "email role username",
      populate: {
        path: "role",
        select: "roleType",
      },
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        employeeAttendance,
        "Fetching employee attendance successfully"
      )
    );
});
