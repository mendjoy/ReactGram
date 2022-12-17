const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

//GENERATE USER TOKEN
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d",
    });
};

//REGISTER USER AND SIGN IN 
    const register = async (req, res) => {

   const {name, email, password} = req.body;

   //CHECK IF USER EXISTS
   const user = await User.findOne({email});

   if(user){
    res.status(422).json({errors: ["Por favor, utilize outro e-mail"]});
    return
   };

   //Generate password hash
   const salt = await bcrypt.genSalt();
   const passwordHash = await bcrypt.hash(password, salt);

   //CREATE USER
   const newUser = await User.create({
        name,
        email, 
        password: passwordHash
   });

   // CHECK IF USER WAS CREATED SUCCESFULLY
   if(!newUser){
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde!"]});
        return
   }

   res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
   });

};

//SIGN USER IN
const login =  async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({email});

    //CHECK IF USERS EXISTS
    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return
    };

    //CHECK IF PASSWORD MATCHES
    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({errors: ["Senha inválida"]})
        return
    };

    //RETURN USER WITH TOKEN
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })

};

module.exports = {
    register,
    login,
};