
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//function to hash a password to store it in db
async function hashPassword(password) {

  try{
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hash = await bcrypt.hash(password, salt); // Hash password with salt
    return hash;
  }catch(error){
  }

}


// function to verify if the password provided by the user is correct
async function verifyPassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

// Function to generate a JWT token
function generateToken(id) {
  const token = jwt.sign(
    {id },
    process.env.JWT_SECRET,
    {
      expiresIn: '3600m',
    }
  );

  return token;
}

// Function to verify a JWT token
function verifyToken(token) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data; 
  } catch (error) {
    return null; 
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken
};