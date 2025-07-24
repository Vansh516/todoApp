const { Router } = require("express");
const {
  createTask,
  getTasks,
  getTask,
  udpateTask,
  deleteTask,
} = require("../controller/task.controllers");
const { authenticate } = require("../middlewares/auth.middlewares");

const router = Router();

router.post("/add", createTask);
router.get("/all", getTasks);
router.get("/:id", getTask);
router.patch("/edit/:id", udpateTask);
router.delete("/delete", deleteTask);

module.exports = router;
