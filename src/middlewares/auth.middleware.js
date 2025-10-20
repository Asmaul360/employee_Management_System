import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    let token = null;
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    } else if (req.header("Authorization")) {
      token = req.header("Authorization").replace("Bearer ", "").trim();
    }
    if (!token) {
      throw new ApiError(401, "No access token, Invalid access token");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
