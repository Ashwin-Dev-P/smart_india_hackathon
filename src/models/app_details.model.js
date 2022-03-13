const mongoose = require("mongoose");

var appDetailsSchema = new mongoose.Schema(
  {
    name: {
      abbreviation: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 1,
      },
      expansion: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 1,
      },
    },
    phone_number: {
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
    whatsapp_number: {
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
    email: {
      type: String,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 320,
    },

    facebook: {
      type: String,
      trim: true,
      unique: true,
      minlength: 0,
    },

    intro: {
      type: String,
      trim: true,
      unique: true,
      required: false,
      minlength: 0,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("app_details", appDetailsSchema);
