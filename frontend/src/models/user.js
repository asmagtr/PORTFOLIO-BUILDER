import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email:{ type: String, required: true, unique: true },
    fullName:{type:String, requires:true},
    password: { type: String, required: true },
  });

  const userModel = mongoose.models.User || mongoose.model('User', userSchema);
  export default userModel