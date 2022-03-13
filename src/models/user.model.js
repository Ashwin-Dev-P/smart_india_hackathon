const mongoose = require("mongoose");
const constants = require("../constants/constants");
const PASSWORD_MIN_REQUIRED_LENGTH = constants.PASSWORD_MIN_REQUIRED_LENGTH;

var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 320,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: PASSWORD_MIN_REQUIRED_LENGTH,
    },
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
    contact_number: {
      country_code: {
        type: Number,
        trim: true,
        max: 999,
        min: 0,
      },
      number: {
        type: Number,
        trim: true,
        max: 99999999999999,
        min: 0,
      },
    },
    dob: {
      type: Date,
      trim: true,
      required: false,
    },
    highest_qualification: {
      type: String,
      trim: true,
      required: false,
      minlength: 0,
    },

    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    /*
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    */
  },
  {
    timestamps: true,
  }
);

userSchema.pre("validate", function (next) {
  console.group("\nPre validate middleware");
  console.groupEnd("Pre Validate middleware");
  next();
});

userSchema.post("validate", function () {
  console.group("Post validate middleware");
  console.groupEnd("Post validate middleware");
});

userSchema.pre("save", function (next) {
  console.group("Pre save middleware");

  const user = this; // JSON.stringify(this.toJSON());

  console.groupEnd("Pre save middleware");
  next();
});

userSchema.post("save", function () {
  console.group("Post save middleware");
  console.groupEnd("Post save middleware");
});

userSchema.pre("deleteOne", function () {
  console.log("Preparing to delete user");
});

userSchema.post("deleteOne", function () {
  console.log("Deleted user");
});

mongoose.model("user", userSchema);
