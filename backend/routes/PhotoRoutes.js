const express = require("express");
const router = express.Router();

//CONTROLLER
const { insertPhoto } = require("../controllers/PhotoController");

//MIDDLEWARES
const { photoInsertValidation } = require("../middlewares/photoValidation");
const authGard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload")

//ROUTES
router.post("/", authGard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);


module.exports = router;