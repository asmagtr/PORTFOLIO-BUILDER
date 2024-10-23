const express = require('express');
const router = express.Router();


// Route for user sign-up
router.post('/signup', signUp);

// Route for user login
router.post('/login', login);


module.exports = router;
