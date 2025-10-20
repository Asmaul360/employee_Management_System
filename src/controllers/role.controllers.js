import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Role } from "../models/role.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createRole = asyncHandler(async (req, res) => {
  const { roleType, description, permissions } = req.body;
  if (!roleType || !description || !permissions || !permissions.length) {
    throw new ApiError(400, "All fields are required!");
  }

  const role = await Role.create({
    description,
    roleType,
    permissions,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, role, "Role created successfully !"));
});
export const getRoleByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const role = await Role.findById(id);
  if (!role) {
    throw new ApiError(404, "The given Role id is incorrect or invalid !!!!");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, role, "User fetched successfully"));
});
export const getAllRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find();
  return res
    .status(200)
    .json(new ApiResponse(200, roles, "All roles fetched successfully"));
});
export const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const role = await Role.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!role) {
    throw new ApiError(400, "Update failed due to Invalid Role id  !!");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, role, "Role updated successfully "));
});

export const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const role = await Role.findByIdAndDelete(id);
  if (!role) {
    throw new ApiError(404, "Delete failed: Invalid Role ID!");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Role deleted successfully !"));
});
