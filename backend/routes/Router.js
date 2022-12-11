const express = require("express");
const router = express();

//rotas da aplicação 

//teste router 
router.get("/", (req, res) => {
    res.send("API WORKING"); 
})

module.exports = router;