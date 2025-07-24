const { Router } = require("express");
const {
  register,
  login,
  logout,
  updatePassword,
  updateProfile,
  deleteProfile,
} = require("../controller/user.controller");
const { authenticate } = require("../middlewares/auth.middlewares");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.patch("/edit-profile", authenticate, updateProfile);
router.patch("/update-password", authenticate, updatePassword);

router.delete("/delete", authenticate, deleteProfile);

module.exports = router;
