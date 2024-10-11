import mongoose from "mongoose";

const Schema = mongoose.Schema;

const portfolioSchema = new mongoose.Schema({
    email:{ type: String, required: true, unique: true },
    fullName:{type:String, required:true},
    profilePicture:{type:String,required:true},
    profession:{type:String,required:true},
    bio:{type:String,required:true},
    resume:{type:String},// he will upload the drive pdf file of their resume
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technology', // Reference to the technology table
      }],
    projects: [{
        title: { type: String, required: true },
        description: { type: String },
        projectImage:{type:String,required:true},
        technologiesUsed: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Technology', // Reference to technologies used in the project
        }],
        githubLink: { type: String },
        liveDemoLink: { type: String },
      }],

      phoneNumber:{type:String,  minlength: 10},
      linkedIn:{type:String},
      instagram:{type:String},
      facebook:{type:String},
      userId:{type: mongoose.Schema.Types.ObjectId,
        ref: 'User'},

  });

  const portfolioModel = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);
  export default portfolioModel