import connectToDB from '@/lib/dbConnect'; 
import userModel from '@/models/user'; 
import { hashPassword, generateToken } from '@/lib/auth'; 



export async function POST(req) {
  const { fullName, email, password } = await req.json();

  if (!fullName) {
    return new Response(JSON.stringify({ message: 'Provide a full name' }), { status: 400 });
  }

  if (!email) {
    return new Response(JSON.stringify({ message: 'Provide an email' }), { status: 400 });
  }

  if (!password) {
    return new Response(JSON.stringify({ message: 'Enter a password' }), { status: 400 });
  }

  try {
    await connectToDB(); 
    
    console.log("am here  1***********")
    const isUser = await userModel.findOne({ email });
    
    console.log("am here  2***********")
    if (isUser) {
    
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
    }
    
    console.log("am here  3***********")
    const hashedPassword = await hashPassword(password);

    console.log("am here  4***********")
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });


    const token = generateToken(newUser._id);

    return new Response(JSON.stringify({ token }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      message: 'Server error',
      error 
    }), { status: 500 });
  }
}


export async function GET(req) 
{
   const salt=await generateSalt();
   console.log("the saalltt is")
   console.log(salt)
   console.log("that's it")
} 