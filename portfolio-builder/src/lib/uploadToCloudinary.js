import cloudinary from "./cloudinaryConfig";

export async function uploadResume(file){
    const cloudinaryResume = await cloudinary.uploader.upload(file, {
        folder: 'portfolios/resumes',
        resource_type: 'raw',
      });
      return cloudinaryResume.secure_url;  
}


export async function uploadProfileImage(file){
    const cloudinaryImage = await cloudinary.uploader.upload(file, {
        folder: 'portfolios/profile_pictures',
      });
      return cloudinaryImage.secure_url;  
}

export async function uploadProjectImage(file){
    const cloudinaryImage = await cloudinary.uploader.upload(file, {
        folder: 'portfolios/projects',
      });
      return cloudinaryImage.secure_url;  
}

