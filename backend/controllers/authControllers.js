const userModel = require('../models/user'); 
const { hashPassword, generateToken } = require('../lib/auth'); 



async function signUp(req, res) {


    const { email, password ,username} = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Provide a username' });
    }
  
    if (!email) {
        return res.status(400).json({ message: 'Provide an email' });
    }
    
    if (!password) {
        return res.status(400).json({ message: 'Enter the password' });
    }
  
    try{
        const existingEmailUser = await User.findOne({ email });
        if (existingEmailUser) {
            return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
        }
    
        // Check if the username already exists
        const existingUsernameUser = await User.findOne({ username });
        if (existingUsernameUser) {
            return res.status(400).json({ message: 'Username already exists. Please pick another username.' });
        }



        const hashedPassword = await hashPassword(password);

        const newUser = await userModel.create({
          fullName,
          email,
          password: hashedPassword,
        });
    
      const token = generateToken(newUser._id);
    
      res.status(201).json({ message: 'User created successfully',token });


    }catch(error){
        return res.status(500).json({ 
            message: 'Server error',
            error
        });
  
    }
  
   
  }
  