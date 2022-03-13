const mongoose = require("mongoose");

var studentSchema = new mongoose.Schema(
  {
    name: {
      first_name: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
      },
      last_name: {
        type: String,
        trim: true,
        required: false,
        minlength: 0,
      },
    },
    days_present: [
      {
        type: Number,
        required: false,
      },
    ],
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Student", studentSchema);
