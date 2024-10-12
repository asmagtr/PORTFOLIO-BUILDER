
import connectToDB from '@/lib/dbConnect'; 
import userModel from '@/models/user'; 
import portfolioModel from '@/models/portfolio';
import { uploadProfileImage,uploadProjectImage,uploadResume } from '@/lib/uploadToCloudinary';
import { verifyToken } from '@/lib/auth';



export async function POST(req){
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return  new Response(JSON.stringify({ message: 'Authorization token is missing' }), { status: 401 });
    }

    userId=verifyToken(token)
    if(!userId){
        return  new Response(JSON.stringify({ message: 'No user found' }), { status: 401 });
    }
    const { email, fullName, profilePicture, profession, bio, resume, skills, projects,
        phoneNumber, linkedIn, instagram, facebook} = req.body;

    if(!fullName || !profilePicture || !profession || !bio){

        return  new Response(JSON.stringify({ message: 'Provide important informations' }), { status: 401 });

    }



}