const mongoose = require("mongoose");

/**
 * student schema
 * @private
 */
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      text: true,
    },
    yearOfBatch: {
      type: Number,
      trim: true,
    },
    skills: {
      type: [String],
      trim: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "college",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef student
 */

module.exports = mongoose.model("student", studentSchema);
