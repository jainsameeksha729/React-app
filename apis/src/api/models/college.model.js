const mongoose = require("mongoose");

/**
 * college schema
 * @private
 */
const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      text: true,
    },
    yearFounded: {
      type: Number,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    country: {
    type: String,
    trim: true,
    },
    noOfStudents: {
      type: Number,
      trim: true,
    },
    courses: {
      type: [String],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef college
 */

module.exports = mongoose.model("college", collegeSchema);
