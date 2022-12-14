
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

//config JSON e formdata
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
const router = require("./routes/Router");
app.use(router);

app.listen(port, () => {
    console.log("app rodando na porta" )
})