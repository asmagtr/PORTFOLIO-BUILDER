
import connectToDB from '@/lib/dbConnect'; 
import userModel from '@/models/user'; 
import {verifyPassword, generateToken } from '@/lib/auth'; 

export async function POST(req) {
  await connectToDB(); 

  const { email, password } = await req.json();
  if(!email){
    return new Response(JSON.stringify({ message: 'Provide an email' }), { status: 400 })
  }

  if(!password){
    return new Response(JSON.stringify({ message: 'Enter the password' }), { status: 400 })
  }

  try{
    const user = await userModel.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: 'Invalid password' }), { status: 401 });
    }
  
    const token = generateToken(user._id);
  
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }catch(error){
    return new Response(JSON.stringify({ 
        message: 'server error' ,
        error
    }), { status: 500 });

  }
 
}
