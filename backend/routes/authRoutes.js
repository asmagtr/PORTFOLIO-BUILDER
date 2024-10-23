const express = require('express');
const router = express.Router();
const{signUp,login}=require("../controllers/authControllers")


// Route for user sign-up
router.post('/signup', signUp);

// Route for user login
router.post('/login', login);


module.exports = router;
