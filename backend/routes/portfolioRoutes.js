const express = require('express');
const router = express.Router();
const authenticateUser=require("../middlewares/authToken");
const upload=require("../middlewares/multer");
const {createPortfolio}=require("../controllers/portfolioControllers")


router.post("/create",authenticateUser,upload.fields([
    { name: 'profilePicture'},
    { name: 'resume'}, 
    { name: 'projectsImages'}, 
]),createPortfolio)

module.exports = router;