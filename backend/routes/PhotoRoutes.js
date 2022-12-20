const express = require("express");
const router = express.Router();

//CONTROLLER
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById } = require("../controllers/PhotoController");

//MIDDLEWARES
const { photoInsertValidation } = require("../middlewares/photoValidation");
const authGard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload")

//ROUTES
router.post("/", authGard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGard, deletePhoto);
router.get("/", authGard, getAllPhotos);
router.get("/user/:id", authGard, getUserPhotos);
router.get("/:id", authGard, getPhotoById);


module.exports = router;