const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("../lib/cloudinaryConfig")

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
