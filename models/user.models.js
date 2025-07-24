const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { number, required } = require("joi");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    totalTask: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  // if()
  let salt = await bcryptjs.genSalt(10);
  let hashedPassword = await bcryptjs.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (eneteredPassword) {
  return await bcryptjs.compare(eneteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
