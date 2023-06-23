/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const {
  login,
  register,
  getName,
  searchUsername
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/detail/:username", getName);
router.get("/search", searchUsername);

module.exports = router;