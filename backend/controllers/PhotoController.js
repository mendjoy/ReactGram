const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

//INSERT A PHOTO, WITH AN USER RELATED TO IT
const insertPhoto = async(req, res) =>{

    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user;
    const user = await User.findById(reqUser._id);

    //CREATE PHOTO 
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    });

    //IF PHOTO WAS CREATED SUCCESSFULLY, RETURN DATA
    if(!newPhoto){
        res.status(422).json({errors: ["Houve um problema, por favor tente novamente mais tarde!"]});
        return

    };

    res.status(201).json(newPhoto);

};

//REMOVE PHOTO FROM DB
const deletePhoto = async(req, res) => {

    const {id} = req.params;
    const reqUser = req.user;

    try {
        const photo =  await Photo.findById(mongoose.Types.ObjectId(id));

        //CHECK IF PHOTO EXISTS
        if(!photo){
            res.status(404).json({errors: ["Foto não encontrada!"]});
            return;
        };

        //CHECK IF PHOTO BELONGS TO USER
        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente!"]});
            return;
        };

        await Photo.findByIdAndDelete(photo._id);
        res.status(200).json({id: photo._id, message: "Foto excluida com sucesso!"});

    } catch (error) {
        res.status(404).json({errors: ["Foto excluida com sucesso!"]});
        return;

        
    };
};

//GET ALL PHOTOS 
const getAllPhotos = async(req, res) => {

    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(photos);

};

//GET USER PHOTOS
const getUserPhotos = async(req, res) => {

    const {id} = req.params;
    const photos = await Photo.find({userId: id})
        .sort([["cretedAt", -1]])
        .exec()
    
        return res.status(200).json(photos)

};

//GET PHOTO BY ID
const getPhotoById = async(req, res) => {

    const {id} = req.params;
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    //CHECK IT PHOTO EXISTS
    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada!"]});
        return;
    };

    res.status(200).json(photo);

};

//UPDATE A PHOTO
const updatePhoto =  async(req, res) => {

    const {id} = req.params;
    const {title} = req.body;

    const reqUser = req.user;
    const photo = await Photo.findById(id);

    //CHECK IF PHOTO EXISTS
    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada!"]});
        return;
    };

    //CHECK IF PHOTO BELONGS TO USER
    if(!photo.userId.equals(reqUser._id)){

        res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde!"]});
        return;
    };

    if(title){
        photo.title = title;
    };

    await photo.save();
    res.status(200).json({photo, message: "Foto atualizada com sucesso!"});

};

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
};