import mongoose, { Schema } from "mongoose";
const employeeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // User account reference
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role", // Role reference like Admin, HR, Staff
      default: null,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department", // Proper department reference
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
      default: "",
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Number,
      required: true,
    },
    currentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave", "Terminated"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
