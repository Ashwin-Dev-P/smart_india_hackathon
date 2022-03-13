const mongoose = require("mongoose");

var classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
    },
    year: {
      starting_year: {
        type: Number,
        required: false,
        min: 1900,
        trim: true,
      },
      ending_year: {
        type: Number,
        required: false,
        min: 1900,
        trim: true,
      },
    },

    /*
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    */

    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Class", classSchema);
