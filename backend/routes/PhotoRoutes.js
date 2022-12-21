const express = require("express");
const router = express.Router();

//CONTROLLER
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos } = require("../controllers/PhotoController");

//MIDDLEWARES
const { photoInsertValidation, photoUpdateValidation, commentValidation } = require("../middlewares/photoValidation");
const authGard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload")

//ROUTES
router.post("/", authGard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGard, deletePhoto);
router.get("/", authGard, getAllPhotos);
router.get("/user/:id", authGard, getUserPhotos);
router.get("/search", authGard, searchPhotos);
router.get("/:id", authGard, getPhotoById);
router.put("/:id", authGard,photoUpdateValidation(), validate, updatePhoto);
router.put("/like/:id", authGard, likePhoto);
router.put("/comment/:id", authGard, commentValidation(), validate, commentPhoto);



module.exports = router;