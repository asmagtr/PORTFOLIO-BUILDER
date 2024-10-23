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