import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Department } from "../models/department.model.js";

export const createDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) throw new ApiError(400, "Department name is required");

  const department = await Department.create({
    name,
    description,
    manager: req.user._id,
    employees: [req.user._id],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, department, "Department created successfully"));
});

export const getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find().populate("manager employees");

  return res
    .status(200)
    .json(
      new ApiResponse(200, departments, "Departments fetched successfully")
    );
});

export const getDepartmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const department =
    await Department.findById(id).populate("manager employees");

  if (!department) throw new ApiError(404, "Department not found");

  return res
    .status(200)
    .json(new ApiResponse(200, department, "Department fetched successfully"));
});

export const updateDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  const department = await Department.findByIdAndUpdate(
    id,
    { name, description },
    { new: true, runValidators: true }
  ).populate("manager employees");

  if (!department) throw new ApiError(404, "Department not found");

  return res
    .status(200)
    .json(new ApiResponse(200, department, "Department updated successfully"));
});

export const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const department = await Department.findByIdAndDelete(id);
  if (!department) throw new ApiError(404, "Department not found");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Department deleted successfully"));
});
