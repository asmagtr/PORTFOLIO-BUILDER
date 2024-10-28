const express = require('express');
const router = express.Router();
const authenticateUser=require("../middlewares/authToken");



router.get("/",authenticateUser,getAllSkills)

module.exports = router;