const express = require("express");
const router = express.Router();

//CONTROLLER
const { register, login, getCurrentUser } = require("../controllers/UserController");

//MIDDLEWARES
const validate = require("../middlewares/handleValidation");
const { userCreateValidation, loginValidation } = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");

//ROUTES
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);

module.exports = router;