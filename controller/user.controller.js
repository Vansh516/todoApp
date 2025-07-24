const userCollection = require("../models/user.models");
const taskCollection = require("../models/task.models");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/Error.utils");
const generateToken = require("../utils/jwt.utils");

const register = asyncHandler(async (req, res) => {
  let { name, email, password, phoneNumber } = req.body;
  let user = await userCollection.create({
    name,
    email,
    password,
    phoneNumber,
  });

  res.status(201).json({
    success: true,
    message: "user registered successfully",
    data: user,
  });
});

const login = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  let user = await userCollection.findOne({ email });
  if (!user) return next(new CustomError("please register first", 400));
  let isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new CustomError("invalid passowrd", 400));

  let token = await generateToken(user._id);
  console.log(token);

  res.cookie("token", token, {
    maxAge: 1 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "user loggedin successfully",
    data: token,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  let userId = req.myUser._id;
  let updatedUser = await userCollection.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "user profile updated",
    data: updatedUser,
  });
});

const updatePassword = asyncHandler(async (req, res) => {
  let user = req.myUser;

  user.password = req.body.password;
  await user.save();

  res.status(200).json({
    success: true,
    message: "password updated",
  });
});

const deleteProfile = asyncHandler(async (req, res) => {
  const userId = req.myUser._id;
  await taskCollection.deleteMany({ createdBy: userId });
  await userCollection.findByIdAndDelete(userId);
  res.status(200).json({
    success: true,
    message: "profile deleted",
  });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "user logged out successfully" });
});

module.exports = {
  register,
  login,
  logout,
  updatePassword,
  updateProfile,
  deleteProfile,
};
