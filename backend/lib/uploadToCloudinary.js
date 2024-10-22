const cloudinary = require('./cloudinaryConfig');


async function uploadResume(file){
    const cloudinaryResume = await cloudinary.uploader.upload(file, {
        folder: 'portfolios/resumes',
        resource_type: 'raw',
      });
      return cloudinaryResume.secure_url;  
}

async function uploadProfileImage(file){
    const cloudinaryImage = await cloudinary.uploader.upload(file, {
        folder: 'portfolios/profile_pictures',
      });
      return cloudinaryImage.secure_url;  
}

async function uploadProjectImage(file){
    const cloudinaryImage = await cloudinary.uploader.upload(file, {
        folder: 'portfolios/projects',
      });
      return cloudinaryImage.secure_url;  
}
module.exports = {
  uploadResume,
  uploadProfileImage,
  uploadProjectImage
};
