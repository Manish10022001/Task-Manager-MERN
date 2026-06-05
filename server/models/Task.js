const mongoose = require("mongoose");

//task schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //points to doc i n user colection
      required: true,
    },
  },
  { timestamps: true }
);

//create and export Task model
module.exports = mongoose.model("Task", taskSchema);
