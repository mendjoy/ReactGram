const express = require("express");
const router = express.Router();

//CONTROLLER
const { register, login } = require("../controllers/UserController");

//MIDDLEWARES
const validate = require("../middlewares/handleValidation");
const { userCreateValidation, loginValidation } = require("../middlewares/userValidations");

//ROUTES
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);

module.exports = router;