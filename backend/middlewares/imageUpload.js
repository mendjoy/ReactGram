const multer = require("multer");
const path = require("path");

//DESTINATION TO STORE IMAGE
const imageStorage = multer.diskStorage({
    destination:function(req, file, cb){
        let folder = "";

        if(req.baseUrl.includes("users")){
            folder = "users";
        } else if(req.baseUrl.includes("photos")){
            folder = "photos";
        }

        cb(null, `uploadas/${folder}/`); //DESTINO DA IMAGEM 
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){

            //UPLOAD ONLY PNG AND JPEG FORMAT
            return cb(new Error("Por favor,  envie apenas PNG OU JGP!"));
        };

        cb(undefined, true);
    }
});

module.exports = {
    imageUpload,
};