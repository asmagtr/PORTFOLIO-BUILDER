
const skillModel=require("../models/skill")
async function getAllSkills(req,res){
    try {
        const skills = await skillModel.find();
        res.status(201).json(
            {
            error:false,
            skills});
      } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error:true,
            errorMessage: 'Failed to fetch skills' });
      }
}