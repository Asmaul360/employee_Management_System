import mongoose, { Schema } from "mongoose";

const payrollSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    allowances: {
      type: Number,
      default: 0,
    },
    deductions: {
      type: Number,
      default: 0,
    },
    grossSalary: {
      type: Number,
      default: function () {
        return this.basicSalary + this.allowances;
      },
    },
    netSalary: {
      type: Number,
      default: function () {
        return this.grossSalary - this.deductions;
      },
    },
    tax: {
      type: Number,
      default: 0,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Payroll = mongoose.model("Payroll", payrollSchema);
