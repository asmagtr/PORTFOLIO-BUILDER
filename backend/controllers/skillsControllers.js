
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


async function addSkill(req,res){
    try {
        const { name, svgUrl } = req.body;
        if(!name || !svgUrl){
            return res.status(400).json({ message: 'Please provide both skill name and svgUrl' });
        }

        // Check if the name or svgUrl already exists
        const existingSkill = await skillModel.findOne({ $or: [{ name }, { svgUrl }] });

        if (existingSkill) {
            return res.status(400).json({ message: 'Skill with this name or svgUrl already exists.' });
        }

        // Create a new skill if it doesn't exist
        const newSkill = new skillModel({ name, svgUrl });
        await newSkill.save();

        return res.status(201).json({ message: 'Skill added successfully!', skill: newSkill });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }


}

module.exports={
    getAllSkills,
    addSkill
}