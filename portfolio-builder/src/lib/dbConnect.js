import mongoose from 'mongoose'

 const connectToDB=async()=>{
    const MONGODB_URI=process.env.MONGODB_URI
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("db connected succesfully")
    }catch(e){
        console.log(e);
    }

    
}

export default connectToDB;