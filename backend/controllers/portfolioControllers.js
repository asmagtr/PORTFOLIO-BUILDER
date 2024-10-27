const Portfolio=require("../models/portfolio");

//function to create a porfolio for a user
async function createPorfolio(req,res){
    console.log(req.files)
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
  }





module.exports={
    createPorfolio,
}