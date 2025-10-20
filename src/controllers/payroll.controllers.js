import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Payroll } from "../models/payroll.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createSalary = asyncHandler(async (req, res) => {
  const {
    employee,
    basicSalary,
    allowances,
    deductions,
    grossSalary,
    netSalary,
    tax,
    paymentDate,
    paymentStatus,
    remarks,
  } = req.body;

  if (
    [
      employee,
      basicSalary,
      allowances,
      deductions,
      grossSalary,
      netSalary,
      tax,
      paymentDate,
      paymentStatus,
      remarks,
    ].some(
      (field) =>
        field === undefined ||
        field === null ||
        (typeof field === "string" && field.trim() === "")
    )
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  const create = await Payroll.create({
    employee,
    basicSalary,
    allowances,
    deductions,
    grossSalary,
    netSalary,
    tax,
    paymentDate,
    paymentStatus,
    remarks,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, create, "Payroll created successfully"));
});

export const employeeSalaries = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const payrollRecord = await Payroll.findById(id).populate({
    path: "employee",
    select: "user",
  });

  if (!payrollRecord) {
    throw new ApiError(404, "Payroll record not found");
  }

  if (
    req.user.roleType !== "Admin" &&
    payrollRecord.employee.user.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "You are not authorized to view this payroll");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        payrollRecord,
        "Employee salary fetched successfully"
      )
    );
});

export const getAllSalaries = asyncHandler(async (req, res) => {
  const allSalaries = await Payroll.find().populate("employee");

  return res
    .status(200)
    .json(
      new ApiResponse(200, allSalaries, "All salaries fetched successfully")
    );
});

export const updateSalary = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedRecord = await Payroll.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  ).populate("employee");

  if (!updatedRecord) {
    throw new ApiError(400, "Unable to update salary record");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedRecord, "Salary updated successfully"));
});

export const deleteSalary = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedRecord = await Payroll.findByIdAndDelete(id);
  if (!deletedRecord) {
    throw new ApiError(400, "Unable to delete salary record");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Salary deleted successfully"));
});
