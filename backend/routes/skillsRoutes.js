const express = require('express');
const router = express.Router();
const authenticateUser=require("../middlewares/authToken");
const {getAllSkills,addSkill}=require("../controllers/skillsControllers")



router.get("/",authenticateUser,getAllSkills)

router.post("/",)

module.exports = router;