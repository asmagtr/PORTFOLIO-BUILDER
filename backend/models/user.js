const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email:{ type: String, required: true, unique: true },
    username:{type:String, requires:true,unique:true},
    password: { type: String, required: true },
  });

  const userModel = mongoose.models.User || mongoose.model('User', userSchema);
module.exports= userModel