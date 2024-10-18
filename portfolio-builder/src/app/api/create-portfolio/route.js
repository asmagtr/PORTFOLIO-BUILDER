
// import connectToDB from '@/lib/dbConnect'; 
// import userModel from '@/models/user'; 
// import portfolioModel from '@/models/portfolio';
// import { uploadProfileImage,uploadProjectImage,uploadResume } from '@/lib/uploadToCloudinary';
// import { verifyToken } from '@/lib/auth';
// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' }); // Temp



// export async function POST(req){
//     // const token = req.headers.authorization?.split(' ')[1]; 
//     // if (!token) {
//     //   return  new Response(JSON.stringify({ message: 'Authorization token is missing' }), { status: 401 });
//     // }

//     // userId=verifyToken(token)
//     // if(!userId){
//     //     return  new Response(JSON.stringify({ message: 'No user found' }), { status: 401 });
//     // }
//     // const { email, fullName, profilePicture, profession, bio, resume, skills, projects,
//     //     phoneNumber, linkedIn, instagram, facebook} = req.body;

//     // if(!fullName || !profilePicture || !profession || !bio){

//     //     return  new Response(JSON.stringify({ message: 'Provide important informations' }), { status: 401 });

//     // }

//     // let profileUrl=''
//     // if(profilePicture){
//     //     pro
//     // }
//     const formData = await req.formData();

//     console.log("////////////////////")
//     console.log(formData.get("project"))
//     console.log("////////////////////")

//     const url=await uploadProfileImage(formData.get("project"))
//     console.log(url)

//     return  new Response(JSON.stringify({ req }), { status: 200 });

// }

// import {NextResponse} from "next/server";
// import fs from 'fs';
// import { pipeline } from 'stream';
// import { promisify } from 'util';
// const pump = promisify(pipeline);

// export async function POST(req,res) {
//     try{
//         const formData = await req.formData();
//         console.log(formData)
//         const file = formData.get('project')
//         const filePath = `./public/file/${file.name}`;
//         await pump(file.stream(), fs.createWriteStream(filePath));
//         return NextResponse.json({status:"success",data:file.size})
//     }
//     catch (e) {
//         return  NextResponse.json({status:"fail",data:e})
//     }
// }
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import { reject } from 'bcrypt/promises';

// Configure Cloudinary with your credentials
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('project');  // Assuming 'project' is the form field name

        if (!file) {
            return NextResponse.json({ status: "fail", data: "No file uploaded" });
        }

        const arrayBuffer= await file.arrayBuffer();
        const buffer= new Uint8Array(arrayBuffer);
        await new Promise((resolve,reject)=>{
            cloudinary.uploader.upload_stream({},function(error,result){if(error) {
                reject(error);
                 return}
                 resolve(result);
            }).end(buffer)
        })


        // Upload to Cloudinary directly from the stream

        // If successful, return the result from Cloudinary
        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error.message });
    }
}
