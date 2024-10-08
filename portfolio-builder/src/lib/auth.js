import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//function to hash a password to store it in db
const saltString= process.env.BCRYPT_SALT_String
export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, saltString);
  return hashedPassword;
}


// function to verify if the password provided by the user is correct
export async function verifyPassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

// Function to generate a JWT token
export function generateToken(id) {
  const token = jwt.sign(
    id ,
    process.env.JWT_SECRET,
    {
      expiresIn: '3600m',
    }
  );

  return token;
}

// Function to verify a JWT token
export function verifyToken(token) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data; 
  } catch (error) {
    return null; 
  }
}