const taskCollection = require("../models/task.models");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/Error.utils");
const userCollection = require("../models/user.models");

//! add task
const createTask = asyncHandler(async (req, res, next) => {
  let { title, content } = req.body;
  let userId = req.myUser._id;

  let newTask = await taskCollection.create({
    title,
    content,
    createdBy: userId,
  });

  await userCollection.findOneAndUpdate(
    { _id: userId },
    { $inc: { totalTask: 1 } }
  );

  res.status(201).json({
    success: true,
    message: "task added successfully",
    data: newTask,
  });
});

//! get all tasks
const getTasks = asyncHandler(async (req, res, next) => {
  let tasks = await taskCollection.find({ createdBy: req.myUser._id });
  if (tasks.length === 0) return next(new CustomError("not found", 404));

  res
    .status(200)
    .json({ success: true, message: "tasks fetched", data: tasks });
});

//! get one task
const getTask = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let task = await taskCollection
    .findOne({
      createdBy: req.myUser._id,
      _id: id,
    })
    .populate({
      path: "createdBy",
      select: "name email -_id",
    });

  if (!task) return next(new CustomError("not found", 404));
  res.status(200).json({ success: true, message: "task found", data: task });
});

//! update task
const udpateTask = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let updatedTask = await taskCollection.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedTask) return next(new CustomError("not found", 404));
  res
    .status(200)
    .json({ success: true, message: "task updated", data: updatedTask });
});

//! delete task
const deleteTask = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let userId = req.myUser._id;
  let deletedTask = await taskCollection.findByIdAndDelete(id, req.body, {
    new: true,
  });
  if (!deletedTask) return next(new CustomError("not found", 404));

  await userCollection.findOneAndUpdate(
    { _id: userId },
    { $inc: { totalTask: -1 } }
  );

  res
    .status(200)
    .json({ success: true, message: "task deleted", data: deletedTask });
});

module.exports = {
  createTask,
  getTask,
  getTasks,
  udpateTask,
  deleteTask,
};
