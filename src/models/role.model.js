import mongoose from "mongoose";
const RoleSchema = new mongoose.Schema(
  {
    roleType: {
      type: String,
      enum: ["admin", "manager", "employee"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);
export const Role = mongoose.model("Role", RoleSchema);
