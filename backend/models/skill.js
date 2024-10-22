import mongoose from "mongoose";

const Schema = mongoose.Schema;

const skillSchema = new mongoose.Schema({
    name:{ type: String, required: true, unique: true },
    svgUrl:{type:String, requires:true},
  });

  const skillModel = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
  export default skillModel