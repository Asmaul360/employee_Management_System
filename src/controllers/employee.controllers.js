import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../models/employee.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createEmployee = asyncHandler(async (req, res) => {
  const {
    role,
    department,
    firstName,
    middleName = "",
    lastName,
    phone,
    designation,
    joinedDate,
    salary,
    permanentAddress,
    currentAddress,
    status = "Active",
  } = req.body;

  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Unauthorized: User not found");
  }

  if (!currentAddress) {
    throw new ApiError(400, "currentAddress is required");
  }

  let profilePhoto = "";
  if (req.file) {
    const result = await uploadOnCloudinary(req.file.path);
    profilePhoto = result ? result.secure_url : "";
  }

  const employee = await Employee.create({
    user: req.user._id,
    role,
    department,
    firstName,
    middleName,
    lastName,
    phone,
    designation,
    joinedDate,
    salary,
    permanentAddress,
    currentAddress,
    profilePhoto,
    status,
  });

  if (!employee) {
    throw new ApiError(400, "Employee creation failed !!");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, employee, "Employee created successfully"));
});
export const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  return res
    .status(200)
    .json(new ApiResponse(200, employees, "Employees fetched successfully"));
});

export const getEmployeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Employee ID");
  }

  const employee = await Employee.findById(id);
  if (!employee) throw new ApiError(400, "Employee not found");

  return res
    .status(200)
    .json(new ApiResponse(200, employee, "Employee fetched successfully"));
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body || {};

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Employee ID");
  }

  const employee = await Employee.findById(id);
  if (!employee) throw new ApiError(400, "Employee not found");

  let profilePhoto = employee.profilePhoto;
  if (req.file) {
    const result = await uploadOnCloudinary(req.file.path);
    if (result) profilePhoto = result.secure_url;
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(
    id,
    {
      $set: {
        role: body.role,
        department: body.department,
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        phone: body.phone,
        designation: body.designation,
        joinedDate: body.joinedDate,
        salary: body.salary,
        permanentAddress: body.permanentAddress,
        currentAddress: body.currentAddress,
        profilePhoto,
        status: body.status,
      },
    },
    { new: true, runValidators: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedEmployee, "Employee updated successfully")
    );
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Employee ID");
  }

  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) throw new ApiError(400, "Employee not found");

  return res
    .status(200)
    .json(new ApiResponse(200, employee, "Employee deleted successfully"));
});
