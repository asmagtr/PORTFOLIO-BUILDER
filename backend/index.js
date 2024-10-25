const express=require("express");
const cors=require("cors");
require('dotenv').config();
const connectToDB=require("./lib/dbConnect");
const authRoutes=require("./routes/authRoutes");



const app = express();
app.use(cors());
app.use(cors({
    origin: '*'
  }));
  app.use(express.json());


  app.use("/api/auth",authRoutes)

  //const upload=require("./middlewares/multer")
  const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET   

});
  const multer = require('multer');
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  const Portfolio=require("./models/portfolio")


  app.post('/upload',  upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'projects[0].projectImage', maxCount: 1 },
    { name: 'projects[1].projectImage', maxCount: 1 }// Adjust maxCount based on expected projects
]), async (req, res) => {
  try {
    // Extract basic fields from req.body
    const { email, fullName, profession, bio, phoneNumber, linkedIn, instagram, facebook, userId } = req.body;

    // Upload profile picture to Cloudinary
    const profilePictureResult = await cloudinary.uploader.upload_stream(req.files.profilePicture[0].buffer);
    const profilePictureUrl = profilePictureResult.secure_url;

    // Upload resume to Cloudinary
    const resumeResult = await cloudinary.uploader.upload_stream(req.files.resume[0].buffer);
    const resumeUrl = resumeResult.secure_url;

    // Prepare project pictures and details
    const projects = [];
    for (const [index, project] of req.files.projects.entries()) {
      const projectDetails = JSON.parse(req.body.projects[index]); // Assuming project details are sent as JSON
      const projectImageResult = await cloudinary.uploader.upload_stream(project.buffer);
      const projectImageUrl = projectImageResult.secure_url;

      projects.push({
        title: projectDetails.title,
        description: projectDetails.description,
        projectImage: projectImageUrl,
        technologiesUsed: projectDetails.technologiesUsed.map(tech => mongoose.Types.ObjectId(tech)),
        githubLink: projectDetails.githubLink,
        liveDemoLink: projectDetails.liveDemoLink,
      });
    }

    // Create a new portfolio entry
    const newPortfolio = new Portfolio({
      email,
      fullName,
      profession,
      bio,
      resume: resumeUrl,
      profilePicture: profilePictureUrl,
      skills: [], // Add logic to handle skills if needed
      projects,
      phoneNumber,
      linkedIn,
      instagram,
      facebook,
      userId: mongoose.Types.ObjectId(userId),
    }); 

    await newPortfolio.save();
    res.status(201).json({ message: 'Portfolio created successfully', portfolio: newPortfolio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

 







  
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
app.listen(PORT,async () => {
    console.log(`Server is running on port ${PORT}`);
    try{
        await connectToDB(MONGO_URI);
    }catch{
        console.log("error in connection to database ");
    }
  });