const userModel = require('../models/user'); 
const { hashPassword, generateToken } = require('../lib/auth'); 


//function to create account
async function signUp(req, res) {


    const { email, password ,username} = req.body;

    if (!username) {
        return res.status(400).json({ 
            error:true,
            message: 'Provide a username' 
        });
    }
  
    if (!email) {
        return res.status(400).json({ 
            error:true,
            message: 'Provide an email'
         });
    }
    
    if (!password) {
        return res.status(400).json({ 
            error:true,
            message: 'Enter the password'
         });
    }
  
    try{
        const existingEmailUser = await User.findOne({ email });
        if (existingEmailUser) {
            return res.status(400).json({
                error:true,
                message: 'Email already exists. Please use a different email.' 
            });
        }
    
        // Check if the username already exists
        const existingUsernameUser = await User.findOne({ username });
        if (existingUsernameUser) {
            return res.status(400).json({
                 error:true,
                 message: 'Username already exists. Please pick another username.'
                 });
        }



        const hashedPassword = await hashPassword(password);

        const newUser = await userModel.create({
          fullName,
          email,
          password: hashedPassword,
        });
    
      const token = generateToken(newUser._id);
    
      return res.status(201).json({
         error:false,
         message: 'User created successfully',
         token });


    }catch(error){
        return res.status(500).json({ 
            error:true,
            message: 'Server error',
            errormessage:error
        });
  
    }
  
   
  }
  

//function to login
async function login(req,res){

    const {emailOrUsername,password}=req.body;
    if(!emailOrUsername){
        return res.status(400).json({
            error:true,
            message:"ENter Email or Username"});
    }
    if(!password){
        return res.status(400).json({error:true,
            message:"Password is required"});
    }


    try{
           //first we look if the provided body has an email 
    let userInfo=await userModel.findOne({email:emailOrUsername});
   //if not than we look for an account with that username
   if(!userInfo){
    userInfo =await userModel.findOne({username:emailOrUsername});
   }

   if(!userInfo){
    return res.status(404).json({
        error:true,
        message:"User Not Found",
    });
   }

  
    const isValidPassword = await hash.comparePassword(password, userInfo.password);


    if(!isValidPassword){
        return res.status(400).json({
            error:true,
            message:"Invalid Credentials"});
    }

    if(isValidPassword){
        const accessToken=generateToken(userInfo._id);

        return res.json({
            error:false,
            message:"Login Successful",
            accessToken,
        });

    }

    }catch(error){
          
        return res.status(500).json({
            error:true,
            message:"server error"
        });
    }
 

}


module.exports={
    signUp,
    login
}