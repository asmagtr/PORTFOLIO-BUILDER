// const multer=require('multer')

// const storage=multer.diskStorage({
//     filename:function (req,file,cb) {
//     cb(null, file.originalname)        
//     }
// });

// const upload=multer({storage:storage});

// module.exports=upload
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration (ensure you have your Cloudinary credentials)
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder in Cloudinary where files will be uploaded
        resource_type: 'auto' , // Specify allowed formats
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
